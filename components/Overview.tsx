
import { DashboardNav } from "@/components/dashboard-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockChart } from "@/components/stock-chart";
import { PrismaClient, Price, News } from "@prisma/client"; // Import News type if needed
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from 'next/link'; // Import Link for news items

interface StockType{
    symbol: string;
    name: string;
    sector?: string;
    change?: number;
    changePercent?: number;
    marketCap?: number;
    volume?: number;
    peRatio?: number;
    dividendYield?: number;
    description?: string;
}


const Overview = ({stock}:{stock:any}) => {
  return (
       <TabsContent value="overview">
       <Card className="shadow-sm dark:bg-gray-900">
         <CardContent className="p-6">
           <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Company Overview</h3>
           {stock.description ? (
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">{stock.description}</p>
           ) : (
               <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">No description available.</p>
           )}

           <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Statistics</h4>
           <div className="space-y-3 text-sm">
             <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
               <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
               <span className="font-medium text-gray-800 dark:text-gray-200">{stock.marketCap}</span>
             </div>
             <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
               <span className="text-gray-500 dark:text-gray-400">Volume</span>
               <span className="font-medium text-gray-800 dark:text-gray-200">{stock.volume}</span>
             </div>
             <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
               <span className="text-gray-500 dark:text-gray-400">P/E Ratio</span>
               <span className="font-medium text-gray-800 dark:text-gray-200">{stock.peRatio?.toFixed(2) ?? 'N/A'}</span>
             </div>
             <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
               <span className="text-gray-500 dark:text-gray-400">Dividend Yield</span>
               <span className="font-medium text-gray-800 dark:text-gray-200">{stock.dividendYield != null ? `${(stock.dividendYield * 100).toFixed(2)}%` : 'N/A'}</span>
             </div>
              <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500 dark:text-gray-400">Sector</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{stock.sector ?? 'N/A'}</span>
              </div>
           </div>
         </CardContent>
       </Card>
     </TabsContent>
  )
}

export default Overview