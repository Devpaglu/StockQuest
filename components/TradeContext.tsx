"use client";
import React, { createContext, useState } from "react";

export const TradeContext = createContext<any>(null);

export const TradeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTrade, setSelectedTrade] = useState(null);
  return (
    <TradeContext.Provider value={{ selectedTrade, setSelectedTrade }}>
      {children}
    </TradeContext.Provider>
  );
};