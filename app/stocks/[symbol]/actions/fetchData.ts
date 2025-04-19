'use server'

export async function FetchNews(id: string){
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        id + " stock" // Be more specific in the query
      )}&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`;
   const res = await fetch(url);
   console.log(res);
   if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();

}
export async function FetchFinance(symbol: string) {
    const ALPHA_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
    if (!ALPHA_API_KEY) {
        throw new Error("Alpha Vantage API key is missing.");
    }
    console.log("1")
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${ALPHA_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch stock data');
    }
    console.log("2")
    const data = await res.json();

    // Check if the response actually contains data
    if (!data["Global Quote"]) {
        throw new Error('No stock data found for the provided symbol.');
    }
    
    return data["Global Quote"];
}

// app/stocks/[symbol]/action/fetchData.ts


// You should store your API keys securely, e.g., in environment variables
const ALPACA_API_KEY_ID = process.env.ALPACA_API_KEY_ID!;
const ALPACA_API_SECRET_KEY = process.env.ALPACA_API_SECRET_KEY!;

// Helper to format ISO date strings (YYYY-MM-DD)
function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

// Fetch historical bars for a symbol from Alpaca
export async function fetchHistoricalBars(symbol: string, {
  start,
  end,
  timeframe = "1Day",
  limit = 50,
}: {
  start?: string,
  end?: string,
  timeframe?: "1Min" | "5Min" | "15Min" | "1Hour" | "1Day",
  limit?: number,
} = {}) {
  // Default: last 100 days
  const now = new Date();
  const defaultEnd = formatDate(new Date(now.getTime() - 24 * 60 * 60 * 1000))
  const defaultStart = formatDate(new Date(now.getTime() - 800 * 24 * 60 * 60 * 1000));

  const params = new URLSearchParams({
    start: start || defaultStart,
    end: end || defaultEnd,
    timeframe,
    limit: limit.toString(),
  });

  const url = `https://data.alpaca.markets/v2/stocks/${symbol}/bars?${params.toString()}`;
  console.log("Fetching historical bars from Alpaca:", url);

  const res = await fetch(url, {
    headers: {
      "APCA-API-KEY-ID": ALPACA_API_KEY_ID,
      "APCA-API-SECRET-KEY": ALPACA_API_SECRET_KEY,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Alpaca data: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // Format for chart: [{ date, open, high, low, close, volume }]
  const bars = (data.bars || []).map((bar: any) => ({
    date: bar.t, // ISO8601 timestamp
    open: bar.o,
    high: bar.h,
    low: bar.l,
    close: bar.c,
    volume: bar.v,
  }));
  console.log("Fetched bars:", bars);
  return bars;
}

// Example usage for SSR or API route
export const fetchData = async(symbol: string) => {
  // You can adjust the date range/timeframe as needed
  const bars = await fetchHistoricalBars(symbol, {
    timeframe: "1Day",
    limit: 1000,
  });

  // Return data for the chart (e.g., pass to StockChart)
  console.log("Fetched historical data:", bars);
  return bars;

}