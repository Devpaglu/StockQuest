import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: { symbol: string } }) => {
  const symbol = (await params).symbol; // Access the symbol from the URL path

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  const stock = await prisma.stock.findFirst({
    where: {
      symbol: symbol,
    }
  });

  if (!stock) {
    return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
  }

  return NextResponse.json(stock);
};
