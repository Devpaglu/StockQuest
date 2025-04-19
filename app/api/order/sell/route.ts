import { auth } from "@clerk/nextjs/server"
import { TradeType } from "@prisma/client"
import { NextResponse } from "next/server"

import { prisma } from '@/lib/prisma'

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

    // 1. Get user's portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: user.id },
    })

    if (!portfolio) {
      return NextResponse.json({ success: false, message: "Portfolio not found" }, { status: 404 })
    }



    // 2. Get stock entry from portfolio
    const stockEntry = await prisma.stockInPortfolio.findFirst({
      where: {
        portfolioId: portfolio.id,
        stockSymbol: stock.symbol,
      },
    })

    if (!stockEntry || stockEntry.quantity < quantity) {
      return NextResponse.json(
        { success: false, message: "Not enough shares to sell" },
        { status: 400 }
      )
    }

    const updatePortfolio = await prisma.portfolio.update({
        where:{
            id:portfolio.id
        },
        data:{
            value:portfolio.value-price*quantity,
            change:price*quantity
        }
    })

  

    // 3. Create SELL trade
    const trade = await prisma.trade.create({
      data: {
        userId: user.id,
        stockSymbol: stock.symbol,
        quantity,
        type: TradeType.SELL,
        priceAtTrade: price,
      },
    })

    // 4. Update user balance (add sale proceeds)
    await prisma.user.update({
      where: { clerkId },
      data: {
        balance: balance + quantity * price,
      },
    })

    // 5. Update stock entry in portfolio
    const newQuantity = stockEntry.quantity - quantity

    if (newQuantity > 0) {
      await prisma.stockInPortfolio.update({
        where: { id: stockEntry.id },
        data: {
          quantity: newQuantity,
          // averagePrice can stay same, or be recalculated if you want
        },
      })
    } else {
      // Remove stock from portfolio if quantity becomes 0
      await prisma.stockInPortfolio.delete({
        where: { id: stockEntry.id },
      })
    }

    return NextResponse.json({ success: true, trade })
  } catch (error) {
    console.error("Sell Trade error:", error)
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
  }
}
