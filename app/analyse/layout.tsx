// app/analyse/layout.tsx
import { TradeProvider } from "@/components/TradeContext";

export default function AnalyseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TradeProvider>{children}</TradeProvider>;
}