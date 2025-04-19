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