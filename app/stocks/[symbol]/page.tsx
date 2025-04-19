// app/stocks/[symbol]/page.tsx

import { DashboardNav } from "@/components/dashboard-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockChart, {  } from "@/components/stock-chart";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from 'next/link'; // Import Link for news items
import Overview from "@/components/Overview";
import PlaceOrder from "@/components/PlaceOrder";
import NewsSection from "@/components/NewsSection";
import {fetchData, FetchFinance, FetchNews } from "./actions/fetchData";


import { prisma } from '@/lib/prisma'


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

  const arr = await fetchData(stock.symbol)

  const priceHistory = arr.map((e:any) => ({
    date: new Date(e.date).toISOString().split('T')[0],
    price: e.close,
  }))
  

  const priceres = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-timeseries?symbol=IBM&region=US",{
    method:'GET',
    headers: {
      'x-rapidapi-key': '0a36914798msh6767ac7df822dc7p1554b2jsnb99b721f5263',
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    }
  })

  const {symbol} =  await params;
  const data = await FetchNews(symbol)
  const news: NewsItem[] = data.articles;


   const fd  = await FetchFinance(symbol);

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