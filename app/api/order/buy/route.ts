import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
import { TradeType } from "@prisma/client"

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { symbol, quantity, price, balance } = body

    const { userId: clerkId } = await auth()
    if (!clerkId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findFirst({ where: { clerkId } })
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    const stock = await prisma.stock.findFirst({ where: { symbol } })
    if (!stock) {
      return NextResponse.json({ success: false, message: "Stock not found" }, { status: 404 })
    }

    // 1. Create trade
    const trade = await prisma.trade.create({
      data: {
        userId: user.id,
        stockSymbol: stock.symbol,
        quantity,
        type: TradeType.BUY,
        priceAtTrade: price,
      },
    })

    // 2. Update user balance
    await prisma.user.update({
      where: { clerkId },
      data: {
        balance: balance - quantity * price,
      },
    })

    let portfolio = await prisma.portfolio.findUnique({
      where: { userId: user.id },
    })

    if (!portfolio) {
      // Create portfolio if it doesn't exist
      portfolio = await prisma.portfolio.create({
        data: {
          userId: user.id,
        },
      })
    }

    const updatePortfolio = await prisma.portfolio.update({
        where:{
            id:portfolio.id
        },
        data:{
            value:portfolio.value+price*quantity,
            change:price*quantity
        }
    })

    // 4. Check if stock already exists in StockInPortfolio
    const existingEntry = await prisma.stockInPortfolio.findFirst({
      where: {
        portfolioId: portfolio.id,
        stockSymbol: stock.symbol,
      },
    })

    if (existingEntry) {
      // Update quantity and averagePrice
      const newQuantity = existingEntry.quantity + quantity
      const newAvgPrice =
        (existingEntry.averagePrice * existingEntry.quantity + price * quantity) / newQuantity

      await prisma.stockInPortfolio.update({
        where: { id: existingEntry.id },
        data: {
          quantity: newQuantity,
          averagePrice: newAvgPrice,
        },
      })
    } else {
      // Create new stock entry in portfolio
      await prisma.stockInPortfolio.create({
        data: {
          portfolioId: portfolio.id,
          stockSymbol: stock.symbol,
          quantity,
          averagePrice: price,
        },
      })
    }

    return NextResponse.json({ success: true, trade })
  } catch (error) {
    console.error("Trade error:", error)
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
  }
}
