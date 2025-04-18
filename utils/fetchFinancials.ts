// utils/fetchFinancials.ts
import "server-only";

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Helper function to make a single Alpha Vantage API call
async function fetchAlphaVantageData(
    ticker: string,
    apiFunction: 'OVERVIEW' | 'INCOME_STATEMENT' | 'BALANCE_SHEET' | 'CASH_FLOW'
): Promise<any> {
    if (!ALPHA_VANTAGE_API_KEY) {
        throw new Error(`Alpha Vantage API Key not configured for function ${apiFunction}.`);
    }

    const url = `https://www.alphavantage.co/query?function=${apiFunction}&symbol=${encodeURIComponent(
        ticker
    )}&apikey=${ALPHA_VANTAGE_API_KEY}`;

    console.log(`[fetchFinancials] Fetching ${apiFunction} for ${ticker}...`);

    try {
        // Adjust revalidation time based on data type (Overview changes more often than statements)
        const revalidateSeconds = apiFunction === 'OVERVIEW' ? 3600 : 86400; // 1 hour for overview, 24 hours for statements
        const res = await fetch(url, { next: { revalidate: revalidateSeconds } });

        if (!res.ok) {
            console.error(`[fetchFinancials] API request failed for ${ticker}/${apiFunction} with status: ${res.status}`);
            return { error: `API request failed for ${apiFunction}: HTTP status ${res.status}` };
        }

        const data = await res.json();

        // Alpha Vantage specific checks
        if (!data || Object.keys(data).length === 0) {
            console.warn(`[fetchFinancials] Received empty response for ${ticker}/${apiFunction}.`);
            return { warning: `No data returned for ${ticker} from ${apiFunction}. Ticker might be invalid or data unavailable.` };
        }
        if (data["Error Message"]) {
            console.error(`[fetchFinancials] Alpha Vantage API error for ${ticker}/${apiFunction}: ${data["Error Message"]}`);
            return { error: `API error from ${apiFunction}: ${data["Error Message"]}` };
        }
        if (data["Note"]) {
             console.warn(`[fetchFinancials] Alpha Vantage API note for ${ticker}/${apiFunction}: ${data["Note"]}`);
             // Return data even with note, but maybe log it
             // If it's a rate limit note AND the data is empty, treat as error:
             if (Object.keys(data).length <= 1) {
                 return { error: `API Note likely indicates issue (e.g., rate limit) for ${apiFunction}: ${data["Note"]}` };
             }
        }
        // For statements, check if the main report arrays are present
         if (['INCOME_STATEMENT', 'BALANCE_SHEET', 'CASH_FLOW'].includes(apiFunction) && (!data.annualReports || !data.quarterlyReports)) {
              console.warn(`[fetchFinancials] ${apiFunction} response for ${ticker} seems incomplete (missing reports).`);
              // Return what we got, but it might be just the symbol or an error note
         }


        console.log(`[fetchFinancials] Successfully fetched ${apiFunction} for ${ticker}.`);
        return data;

    } catch (error: any) {
        console.error(`[fetchFinancials] Failed to fetch ${apiFunction} for ${ticker}:`, error);
        return { error: `Failed to fetch ${apiFunction}: ${error.message || 'Unknown fetch error'}` };
    }
}


/**
 * Fetches Overview, Income Statement, Balance Sheet, and Cash Flow data for a
 * given ticker from Alpha Vantage, combines them into an object, and returns
 * the object as a JSON string.
 *
 * WARNING: This can produce extremely large strings due to the full financial statements.
 * Consider processing/truncating data before stringifying if token limits are a concern.
 *
 * @param ticker - The stock ticker symbol.
 * @returns A JSON string containing the combined financial data or error information.
 */
export default async function fetchFinancials(ticker: string | null): Promise<string> {
    if (!ticker) {
        console.warn("[fetchFinancials] No ticker provided.");
        return JSON.stringify({ error: "No ticker provided for financial data." });
    }

    if (!ALPHA_VANTAGE_API_KEY) {
        console.error("[fetchFinancials] ALPHA_VANTAGE_API_KEY is not set.");
        return JSON.stringify({ error: "Financial data API key is not configured." });
    }

    console.log(`[fetchFinancials] Starting parallel fetch for all financial data for ${ticker}...`);

    // Fetch all data points in parallel
    const results = await Promise.allSettled([
        fetchAlphaVantageData(ticker, 'OVERVIEW'),
        fetchAlphaVantageData(ticker, 'INCOME_STATEMENT'),
        fetchAlphaVantageData(ticker, 'BALANCE_SHEET'),
        fetchAlphaVantageData(ticker, 'CASH_FLOW')
    ]);

    // Process results
    const combinedData = {
        overview: results[0].status === 'fulfilled' ? results[0].value : { error: `Failed to fetch Overview: ${results[0].reason}` },
        incomeStatement: results[1].status === 'fulfilled' ? results[1].value : { error: `Failed to fetch Income Statement: ${results[1].reason}` },
        balanceSheet: results[2].status === 'fulfilled' ? results[2].value : { error: `Failed to fetch Balance Sheet: ${results[2].reason}` },
        cashFlow: results[3].status === 'fulfilled' ? results[3].value : { error: `Failed to fetch Cash Flow: ${results[3].reason}` }
    };

    // --- Optional: Data Reduction ---
    // If you want to reduce size, you could process 'combinedData' here, e.g.:
    // combinedData.incomeStatement = combinedData.incomeStatement?.annualReports?.[0]; // Keep only latest annual income report
    // combinedData.balanceSheet = combinedData.balanceSheet?.annualReports?.[0];
    // combinedData.cashFlow = combinedData.cashFlow?.annualReports?.[0];
    // Delete quarterly reports if not needed:
    // delete combinedData.incomeStatement?.quarterlyReports;
    // delete combinedData.balanceSheet?.quarterlyReports;
    // delete combinedData.cashFlow?.quarterlyReports;
    // ---------------------------------


    console.log(`[fetchFinancials] Completed fetching all financial parts for ${ticker}. Stringifying results.`);

    try {
        // Convert the combined object containing all fetched data/errors into a single JSON string
        const jsonString = JSON.stringify(combinedData);

        // Add a length check warning
        if (jsonString.length > 15000) { // Adjust threshold as needed
             console.warn(`[fetchFinancials] Combined financial JSON string for ${ticker} is very large: ${jsonString.length} characters. Consider reducing data.`);
        } else {
             console.log(`[fetchFinancials] Combined financial JSON string length for ${ticker}: ${jsonString.length} characters.`);
        }

        return jsonString;

    } catch (stringifyError: any) {
        console.error(`[fetchFinancials] Failed to stringify combined financial data for ${ticker}:`, stringifyError);
        return JSON.stringify({ error: `Failed to process financial data: ${stringifyError.message}` });
    }
}