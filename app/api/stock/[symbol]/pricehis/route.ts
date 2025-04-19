import { NextRequest, NextResponse } from 'next/server';
import Alpaca from '@alpacahq/alpaca-trade-api';

const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY_ID!,
  secretKey: process.env.ALPACA_API_SECRET_KEY!,
  paper: true,
});

export async function GET(req: NextRequest, { params }: { params: { symbol: string } }) {
  const { symbol } = await params;
  try {
    const trade = await fetch(`http://data.alpaca.markets/v2/stocks/trades?limit=1000&feed=sip&sort=asc&symbols=${symbol}`, {
        method: 'GET',
        headers: {
            'content': 'application/json',
            'APCA-API-KEY-ID': process.env.ALPACA_API_KEY_ID
        }
      });
      
      
    return NextResponse.json(trade, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch stock data.' }, { status: 500 });
  }
}
