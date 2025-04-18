import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
    const portfolio = await prisma.portfolio.create({
        data: {
          userId: "cm9n8l5cr0000rkf27ehu85x5",
          value: 123392,
          change: 42,
          stockPortfolio: {
            create: [
              {
                stock: {
                  connect: {
                    symbol: "AAPL", 
                  },
                },
                quantity: 10,
                averagePrice: 150.75,
              },
            ],
          },
        },
      });

    const users = prisma.user.findMany()
      
      console.log(users);
      
    }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })