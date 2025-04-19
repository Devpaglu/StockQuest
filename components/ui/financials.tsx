// src/app/stocks/[symbol]/components/financials.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, AlertTriangle } from "lucide-react";

// --- Define or Import Financial Types (Keep here or move to shared types) ---
interface IncomeStatementReport {
  fiscalDateEnding: string; reportedCurrency: string; grossProfit: string | null; totalRevenue: string | null; costOfRevenue: string | null; costofGoodsAndServicesSold: string | null; operatingIncome: string | null; sellingGeneralAndAdministrative: string | null; researchAndDevelopment: string | null; operatingExpenses: string | null; investmentIncomeNet: string | null; netInterestIncome: string | null; interestIncome: string | null; interestExpense: string | null; nonInterestIncome: string | null; otherNonOperatingIncome: string | null; depreciation: string | null; depreciationAndAmortization: string | null; incomeBeforeTax: string | null; incomeTaxExpense: string | null; interestAndDebtExpense: string | null; netIncomeFromContinuingOperations: string | null; comprehensiveIncomeNetOfTax: string | null; ebit: string | null; ebitda: string | null; netIncome: string | null;
}
interface BalanceSheetReport {
  fiscalDateEnding: string; reportedCurrency: string; totalAssets: string | null; totalCurrentAssets: string | null; cashAndCashEquivalentsAtCarryingValue: string | null; cashAndShortTermInvestments: string | null; inventory: string | null; currentNetReceivables: string | null; totalNonCurrentAssets: string | null; propertyPlantEquipment: string | null; accumulatedDepreciationAmortizationPPE: string | null; intangibleAssets: string | null; intangibleAssetsExcludingGoodwill: string | null; goodwill: string | null; investments: string | null; longTermInvestments: string | null; shortTermInvestments: string | null; otherCurrentAssets: string | null; otherNonCurrentAssets: string | null; totalLiabilities: string | null; totalCurrentLiabilities: string | null; currentAccountsPayable: string | null; deferredRevenue: string | null; currentDebt: string | null; shortTermDebt: string | null; totalNonCurrentLiabilities: string | null; capitalLeaseObligations: string | null; longTermDebt: string | null; currentLongTermDebt: string | null; longTermDebtNoncurrent: string | null; shortLongTermDebtTotal: string | null; otherCurrentLiabilities: string | null; otherNonCurrentLiabilities: string | null; totalShareholderEquity: string | null; treasuryStock: string | null; retainedEarnings: string | null; commonStock: string | null; commonStockSharesOutstanding: string | null;
}
interface CashFlowReport {
    fiscalDateEnding: string; reportedCurrency: string; operatingCashflow: string | null; paymentsForOperatingActivities: string | null; proceedsFromOperatingActivities: string | null; changeInOperatingLiabilities: string | null; changeInOperatingAssets: string | null; depreciationDepletionAndAmortization: string | null; capitalExpenditures: string | null; changeInReceivables: string | null; changeInInventory: string | null; profitLoss: string | null; cashflowFromInvestment: string | null; cashflowFromFinancing: string | null; proceedsFromRepaymentsOfShortTermDebt: string | null; paymentsForRepurchaseOfCommonStock: string | null; paymentsForRepurchaseOfEquity: string | null; paymentsForRepurchaseOfPreferredStock: string | null; dividendPayout: string | null; dividendPayoutCommonStock: string | null; dividendPayoutPreferredStock: string | null; proceedsFromIssuanceOfCommonStock: string | null; proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: string | null; proceedsFromIssuanceOfPreferredStock: string | null; proceedsFromRepurchaseOfEquity: string | null; proceedsFromSaleOfTreasuryStock: string | null; changeInCashAndCashEquivalents: string | null; changeInExchangeRate: string | null; netIncome: string | null;
}
// --- End Financial Types ---

// --- Helper Function for Financial Formatting ---
const formatFinancialValue = (value: string | null | undefined): string => {
  if (value === null || value === undefined || value === "None" || value === "") return "N/A";
  const num = Number(value);
  if (isNaN(num)) return "N/A";
  if (Math.abs(num) >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(2);
};

// --- Helper to get financial data for a specific year and metric ---
const getFinancialData = <T extends { fiscalDateEnding: string }>(
    reports: T[], year: string, metric: keyof T
): string | null => {
    const report = reports.find(r => r && r.fiscalDateEnding && new Date(r.fiscalDateEnding).getFullYear().toString() === year);
    return report && metric in report && report[metric] !== null && report[metric] !== undefined
           ? String(report[metric]) : null;
};

// --- Props Interface for the Component ---
interface FinancialsSectionProps {
  symbol: string;
  isLoading: boolean;
  error: string | null;
  incomeStatements: IncomeStatementReport[];
  balanceSheets: BalanceSheetReport[];
  cashFlows: CashFlowReport[];
  financialYears: string[];
}

// --- The Component ---
export function FinancialsSection({
  symbol,
  isLoading,
  error,
  incomeStatements,
  balanceSheets,
  cashFlows,
  financialYears,
}: FinancialsSectionProps) {

    const currency = incomeStatements[0]?.reportedCurrency || balanceSheets[0]?.reportedCurrency || cashFlows[0]?.reportedCurrency || 'USD';

    // Define metrics to display for each statement type
    const incomeMetrics: (keyof IncomeStatementReport)[] = ['totalRevenue', 'grossProfit', 'operatingIncome', 'ebitda', 'netIncome'];
    const balanceMetrics: (keyof BalanceSheetReport)[] = ['totalAssets', 'totalCurrentAssets', 'cashAndShortTermInvestments', 'inventory', 'totalLiabilities', 'totalCurrentLiabilities', 'shortLongTermDebtTotal', 'totalShareholderEquity'];
    const cashFlowMetrics: (keyof CashFlowReport)[] = ['operatingCashflow', 'capitalExpenditures', 'cashflowFromInvestment', 'cashflowFromFinancing', 'dividendPayoutCommonStock', 'netIncome'];

    // Helper to format metric names nicely
    const formatMetricName = (metric: string): string => {
        if (metric === 'dividendPayoutCommonStock') return 'Dividends Paid (Common)';
        return metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Statements</CardTitle>
        <p className="text-sm text-muted-foreground">
          Annual data. All values in {currency}. Displaying up to {financialYears.length > 0 ? financialYears.length : 5} most recent years.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
            <p className="text-muted-foreground">Loading financials...</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="text-center py-6 px-4 bg-destructive/10 border border-destructive/30 rounded-md flex flex-col items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive mb-2" />
            <p className="text-destructive font-semibold">Error Loading Financials</p>
            <p className="text-sm text-destructive/80 mt-1 text-center max-w-md">{error}</p>
          </div>
        )}
        {!isLoading && !error && financialYears.length === 0 && (
          <p className="text-muted-foreground text-center py-10">No annual financial data found for {symbol}.</p>
        )}
        {!isLoading && !error && financialYears.length > 0 && (
          <Accordion type="multiple" defaultValue={['income-statement']} className="w-full">
            {/* Income Statement */}
            <AccordionItem value="income-statement">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">Income Statement</AccordionTrigger>
              <AccordionContent>
                {incomeStatements.length > 0 ? (
                  <div className="overflow-x-auto rounded-md border">
                    <Table>
                      <TableHeader><TableRow>
                        <TableHead className="font-semibold sticky left-0 bg-muted/50 backdrop-blur-sm z-10 whitespace-nowrap">Metric</TableHead>
                        {financialYears.map(year => <TableHead key={year} className="text-right font-semibold">{year}</TableHead>)}
                      </TableRow></TableHeader>
                      <TableBody>
                        {incomeMetrics.map(metric => (
                          <TableRow key={metric}>
                            <TableCell className="font-medium capitalize sticky left-0 bg-background/95 z-10 whitespace-nowrap">{formatMetricName(metric)}</TableCell>
                            {financialYears.map(year => (
                              <TableCell key={`${metric}-${year}`} className="text-right tabular-nums whitespace-nowrap">
                                {formatFinancialValue(getFinancialData(incomeStatements, year, metric))}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (<p className="text-sm text-muted-foreground py-4 text-center">Income statement data not available.</p>)}
              </AccordionContent>
            </AccordionItem>

            {/* Balance Sheet */}
             <AccordionItem value="balance-sheet">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">Balance Sheet</AccordionTrigger>
                <AccordionContent>
                     {balanceSheets.length > 0 ? (
                        <div className="overflow-x-auto rounded-md border">
                            <Table>
                                <TableHeader><TableRow>
                                    <TableHead className="font-semibold sticky left-0 bg-muted/50 backdrop-blur-sm z-10 whitespace-nowrap">Metric</TableHead>
                                    {financialYears.map(year => <TableHead key={year} className="text-right font-semibold">{year}</TableHead>)}
                                </TableRow></TableHeader>
                                <TableBody>
                                     {balanceMetrics.map(metric => (
                                        <TableRow key={metric}>
                                            <TableCell className="font-medium capitalize sticky left-0 bg-background/95 z-10 whitespace-nowrap">{formatMetricName(metric)}</TableCell>
                                            {financialYears.map(year => (
                                                <TableCell key={`${metric}-${year}`} className="text-right tabular-nums whitespace-nowrap">
                                                    {formatFinancialValue(getFinancialData(balanceSheets, year, metric))}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (<p className="text-sm text-muted-foreground py-4 text-center">Balance sheet data not available.</p>)}
                </AccordionContent>
            </AccordionItem>

            {/* Cash Flow */}
            <AccordionItem value="cash-flow">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">Cash Flow Statement</AccordionTrigger>
                <AccordionContent>
                    {cashFlows.length > 0 ? (
                         <div className="overflow-x-auto rounded-md border">
                            <Table>
                                <TableHeader><TableRow>
                                    <TableHead className="font-semibold sticky left-0 bg-muted/50 backdrop-blur-sm z-10 whitespace-nowrap">Metric</TableHead>
                                    {financialYears.map(year => <TableHead key={year} className="text-right font-semibold">{year}</TableHead>)}
                                </TableRow></TableHeader>
                                <TableBody>
                                     {cashFlowMetrics.map(metric => (
                                        <TableRow key={metric}>
                                             <TableCell className="font-medium capitalize sticky left-0 bg-background/95 z-10 whitespace-nowrap">{formatMetricName(metric)}</TableCell>
                                            {financialYears.map(year => (
                                                <TableCell key={`${metric}-${year}`} className="text-right tabular-nums whitespace-nowrap">
                                                    {formatFinancialValue(getFinancialData(cashFlows, year, metric))}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                     ) : (<p className="text-sm text-muted-foreground py-4 text-center">Cash flow statement data not available.</p>)}
                </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}