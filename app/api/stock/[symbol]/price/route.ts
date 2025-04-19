import { NextRequest, NextResponse } from 'next/server';
import Alpaca from '@alpacahq/alpaca-trade-api';

const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY_ID!,
  secretKey: process.env.ALPACA_API_SECRET_KEY!,
  paper: true,
});

export async function GET(req: NextRequest, { params }: { params: { symbol: string } }) {
  const { symbol } = await params;

  if (typeof symbol !== 'string') {
    return NextResponse.json({ error: 'Symbol must be a string.' }, { status: 400 });
  }

  try {
    const trade = await alpaca.getLatestTrade(symbol);
    return NextResponse.json(trade, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch stock data.' }, { status: 500 });
  }
}
