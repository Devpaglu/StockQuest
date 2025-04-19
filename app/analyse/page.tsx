import React, { Suspense } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import TradedStocks from "@/components/TradedStocks";
import Analyser from "@/components/Analyser";

const AnalysePage = () => {
  return (
    <div>
      <DashboardNav />
      <div className="flex flex-row justify-between">
        <TradedStocks />
        <Suspense fallback={<div>Loading analysis...</div>}>
          <Analyser />
        </Suspense>
      </div>
    </div>
  );
};

export default AnalysePage;