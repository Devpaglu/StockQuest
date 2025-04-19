import Analyser from "@/components/Analyser"
import { DashboardNav } from "@/components/dashboard-nav"
import TradedStocks from "@/components/TradedStocks"

const page = () => {
  return (
    <div>
        <DashboardNav/>
        <div className="flex flex-row justify-between">
            <TradedStocks/>
            <Analyser/>
        </div>
    </div>
  )
}

export default page