// app/stocks/[symbol]/page.tsx

import { DashboardNav } from "@/components/dashboard-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockChart, {  } from "@/components/stock-chart";
import { PrismaClient} from "@prisma/client"; // Import News type if needed
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from 'next/link'; // Import Link for news items
import Overview from "@/components/Overview";
import PlaceOrder from "@/components/PlaceOrder";
import NewsSection from "@/components/NewsSection";
import { FetchFinance, FetchNews } from "./actions/fetchdata";


const prisma = new PrismaClient(); // Keeping it simple here for the example


interface FinancialData {
  symbol: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
  latestTradingDay: string;
  previousClose: number;
  change: number;
  changePercent: string;
}

function mapApiResponse(rawData: any): FinancialData {
  return {
    symbol: rawData['01. symbol'],
    open: parseFloat(rawData['02. open']),
    high: parseFloat(rawData['03. high']),
    low: parseFloat(rawData['04. low']),
    price: parseFloat(rawData['05. price']),
    volume: parseInt(rawData['06. volume']),
    latestTradingDay: rawData['07. latest trading day'],
    previousClose: parseFloat(rawData['08. previous close']),
    change: parseFloat(rawData['09. change']),
    changePercent: rawData['10. change percent']
  };
}



type NewsItem = {
  source: { name: string; id?: string | null };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export default async function StockPage({
  params,
  }: {
    params: { symbol: string };
  }) {

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) {
     console.warn("Authenticated user with Clerk ID not found in local DB:", userId);
  }

  const stock = await prisma.stock.findUnique({
    where: {
      symbol: (await params).symbol.toUpperCase(), // Normalize symbol just in case
    },
  }) ;

  if (!stock) {
    notFound(); 
  }

  const res = await fetch(`http://localhost:3000/api/stock/${stock.symbol}/price`)
  const currentPrice = (await res.json())?.Price

  const priceHistory = [
    { "date": "2024-10-01", "price": 345.67 },
    { "date": "2024-10-02", "price": 348.92 },
    { "date": "2024-10-03", "price": 351.45 },
    { "date": "2024-10-04", "price": 349.78 },
    { "date": "2024-10-07", "price": 352.31 },
    { "date": "2024-10-08", "price": 356.89 },
    { "date": "2024-10-09", "price": 359.12 },
    { "date": "2024-10-10", "price": 357.45 },
    { "date": "2024-10-11", "price": 360.23 },
    { "date": "2024-10-14", "price": 362.78 },
    { "date": "2024-10-15", "price": 365.91 },
    { "date": "2024-10-16", "price": 364.56 },
    { "date": "2024-10-17", "price": 367.82 },
    { "date": "2024-10-18", "price": 369.45 },
    { "date": "2024-10-21", "price": 366.78 },
    { "date": "2024-10-22", "price": 368.92 },
    { "date": "2024-10-23", "price": 371.34 },
    { "date": "2024-10-24", "price": 373.67 },
    { "date": "2024-10-25", "price": 370.89 },
    { "date": "2024-10-28", "price": 372.45 },
    { "date": "2024-10-29", "price": 375.23 },
    { "date": "2024-10-30", "price": 373.78 },
    { "date": "2024-10-31", "price": 371.56 },
    { "date": "2024-11-01", "price": 374.23 },
    { "date": "2024-11-04", "price": 377.89 },
    { "date": "2024-11-05", "price": 380.12 },
    { "date": "2024-11-06", "price": 382.45 },
    { "date": "2024-11-07", "price": 385.67 },
    { "date": "2024-11-08", "price": 387.23 },
    { "date": "2024-11-11", "price": 389.56 },
    { "date": "2024-11-12", "price": 386.78 },
    { "date": "2024-11-13", "price": 384.23 },
    { "date": "2024-11-14", "price": 387.45 },
    { "date": "2024-11-15", "price": 390.12 },
    { "date": "2024-11-18", "price": 392.67 },
    { "date": "2024-11-19", "price": 395.23 },
    { "date": "2024-11-20", "price": 393.45 },
    { "date": "2024-11-21", "price": 396.78 },
    { "date": "2024-11-22", "price": 398.34 },
    { "date": "2024-11-25", "price": 401.23 },
    { "date": "2024-11-26", "price": 403.67 },
    { "date": "2024-11-27", "price": 405.89 },
    { "date": "2024-11-29", "price": 404.56 },
    { "date": "2024-12-02", "price": 407.23 },
    { "date": "2024-12-03", "price": 405.67 },
    { "date": "2024-12-04", "price": 402.34 },
    { "date": "2024-12-05", "price": 398.78 },
    { "date": "2024-12-06", "price": 401.45 },
    { "date": "2024-12-09", "price": 404.23 },
    { "date": "2024-12-10", "price": 407.89 },
    { "date": "2024-12-11", "price": 410.56 },
    { "date": "2024-12-12", "price": 413.23 },
    { "date": "2024-12-13", "price": 415.67 },
    { "date": "2024-12-16", "price": 418.34 },
    { "date": "2024-12-17", "price": 420.89 },
    { "date": "2024-12-18", "price": 423.45 },
    { "date": "2024-12-19", "price": 425.78 },
    { "date": "2024-12-20", "price": 428.23 },
    { "date": "2024-12-23", "price": 430.56 },
    { "date": "2024-12-24", "price": 432.12 },
    { "date": "2024-12-26", "price": 435.67 },
    { "date": "2024-12-27", "price": 438.23 },
    { "date": "2024-12-30", "price": 440.89 },
    { "date": "2024-12-31", "price": 442.45 },
    { "date": "2025-01-02", "price": 445.78 },
    { "date": "2025-01-03", "price": 448.34 },
    { "date": "2025-01-06", "price": 450.67 },
    { "date": "2025-01-07", "price": 447.23 },
    { "date": "2025-01-08", "price": 443.89 },
    { "date": "2025-01-09", "price": 446.45 },
    { "date": "2025-01-10", "price": 449.78 },
    { "date": "2025-01-13", "price": 452.34 },
    { "date": "2025-01-14", "price": 455.67 },
    { "date": "2025-01-15", "price": 458.23 },
    { "date": "2025-01-16", "price": 460.89 },
    { "date": "2025-01-17", "price": 463.45 },
    { "date": "2025-01-21", "price": 465.78 },
    { "date": "2025-01-22", "price": 462.34 },
    { "date": "2025-01-23", "price": 459.67 },
    { "date": "2025-01-24", "price": 462.23 },
    { "date": "2025-01-27", "price": 465.89 },
    { "date": "2025-01-28", "price": 468.45 },
    { "date": "2025-01-29", "price": 470.12 },
    { "date": "2025-01-30", "price": 467.56 },
    { "date": "2025-01-31", "price": 464.23 },
    { "date": "2025-02-03", "price": 467.89 },
    { "date": "2025-02-04", "price": 470.45 },
    { "date": "2025-02-05", "price": 473.12 },
    { "date": "2025-02-06", "price": 475.67 },
    { "date": "2025-02-07", "price": 478.23 },
    { "date": "2025-02-10", "price": 480.89 },
    { "date": "2025-02-11", "price": 483.45 },
    { "date": "2025-02-12", "price": 485.12 },
    { "date": "2025-02-13", "price": 482.67 },
    { "date": "2025-02-14", "price": 485.23 },
    { "date": "2025-02-18", "price": 487.89 },
    { "date": "2025-02-19", "price": 490.45 },
    { "date": "2025-02-20", "price": 487.12 },
    { "date": "2025-02-21", "price": 484.67 },
    { "date": "2025-02-24", "price": 481.23 },
    { "date": "2025-02-25", "price": 478.89 },
    { "date": "2025-02-26", "price": 481.45 },
    { "date": "2025-02-27", "price": 484.12 },
    { "date": "2025-02-28", "price": 486.67 },
    { "date": "2025-03-03", "price": 489.23 },
    { "date": "2025-03-04", "price": 491.89 },
    { "date": "2025-03-05", "price": 494.45 },
    { "date": "2025-03-06", "price": 496.12 },
    { "date": "2025-03-07", "price": 493.67 },
    { "date": "2025-03-10", "price": 490.23 },
    { "date": "2025-03-11", "price": 492.89 },
    { "date": "2025-03-12", "price": 495.45 },
    { "date": "2025-03-13", "price": 498.12 },
    { "date": "2025-03-14", "price": 500.67 },
    { "date": "2025-03-17", "price": 497.23 },
    { "date": "2025-03-18", "price": 494.89 },
    { "date": "2025-03-19", "price": 497.45 },
    { "date": "2025-03-20", "price": 500.12 },
    { "date": "2025-03-21", "price": 502.67 },
    { "date": "2025-03-24", "price": 505.23 },
    { "date": "2025-03-25", "price": 507.89 },
    { "date": "2025-03-26", "price": 510.45 },
    { "date": "2025-03-27", "price": 512.12 },
    { "date": "2025-03-28", "price": 514.67 },
    { "date": "2025-03-31", "price": 517.23 },
    { "date": "2025-04-01", "price": 519.89 },
    { "date": "2025-04-02", "price": 522.45 },
    { "date": "2025-04-03", "price": 525.12 },
    { "date": "2025-04-04", "price": 527.67 },
    { "date": "2025-04-07", "price": 530.23 },
    { "date": "2025-04-08", "price": 532.89 },
    { "date": "2025-04-09", "price": 535.45 },
    { "date": "2025-04-10", "price": 538.12 },
    { "date": "2025-04-11", "price": 540.67 },
    { "date": "2025-04-14", "price": 543.23 },
    { "date": "2025-04-15", "price": 545.89 },
    { "date": "2025-04-16", "price": 548.45 },
    { "date": "2025-04-17", "price": 551.12 },
    { "date": "2025-04-18", "price": 553.67 }
  ]

  const priceres = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-timeseries?symbol=IBM&region=US",{
    method:'GET',
    headers: {
      'x-rapidapi-key': '0a36914798msh6767ac7df822dc7p1554b2jsnb99b721f5263',
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    }
  })

  const {symbol} =  await params;
  const data = await FetchNews(symbol)
  console.log("neww s   s s ")
  //console.log(data)
  const news: NewsItem[] = data.articles;


   const fd  = await FetchFinance(symbol);
  // console.log(financialData)

  const financialData = mapApiResponse(fd);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <DashboardNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* --- Header --- */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stock.symbol}</h1>
          </div>
          <h2 className="text-xl text-gray-700 dark:text-gray-300">{stock.name}</h2>
        </div>

        <StockChart symbol={stock.symbol} priceHistory={priceHistory}/>

    

        {/* --- Tabs --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
             {/* If Tabs implementation uses client hooks, wrap this section */}
             {/* <ClientTabsWrapper stock={stock} formatNumber={formatNumber} newsItems={newsItems} /> */}
            <Tabs defaultValue="overview">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
              </TabsList>

           
              <Overview stock={stock}/>

              {/* Financials Tab */}
              <TabsContent value="financials">
                <Card className="shadow-sm dark:bg-gray-900">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Financial Information</h3>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Symbol:</strong> {financialData.symbol}</li>
                      <li><strong>Open:</strong> ${financialData.open}</li>
                      <li><strong>High:</strong> ${financialData.high}</li>
                      <li><strong>Low:</strong> ${financialData.low}</li>
                      <li><strong>Current Price:</strong> ${financialData.price}</li>
                      <li><strong>Volume:</strong> {financialData.volume}</li>
                      <li><strong>Latest Trading Day:</strong> {financialData.latestTradingDay}</li>
                      <li><strong>Previous Close:</strong> ${financialData.previousClose}</li>
                      <li><strong>Change:</strong> ${financialData.change} ({financialData.changePercent})</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="news" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Latest News</h3>
                {news.length > 0 ? (
                  <ul className="space-y-4"> {/* Use space-y for better separation */}
                    {news.map((item, index) => (
                      <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                        <a
                          href={item.url}
                          target="_blank" // Open in new tab
                          rel="noopener noreferrer" // Security best practice
                          className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
                        >
                          {item.title}
                        </a>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Source: {item.source.name}</span> | <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No news available for {symbol?.toUpperCase()}.</p>
                )}
              </CardContent>
            </Card>
            </TabsContent>

              
            </Tabs>
          </div>

          <PlaceOrder stock={stock} currentPrice={currentPrice} balance={user?.balance}/>
        </div>
      </main>
    </div>
  );
}