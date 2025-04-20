import { NextRequest, NextResponse } from "next/server";
import fetchNews from "@/utils/fetchNews";
import fetchFinancials from "@/utils/fetchFinancials";

// Ensure environment variables are loaded (consider using a config file or process.env)
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { message, ticker } = await req.json();

    if (!ticker) {
      return NextResponse.json({ reply: "```\nError: Could not determine the stock ticker from the URL.\n```" }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ reply: "```\nError: No message provided.\n```" }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
        console.error("OpenRouter API key is missing.");
        return NextResponse.json({ reply: "```\nConfiguration Error: AI service is not configured.\n```" }, { status: 500 });
    }

    console.log(`[API Chatbot] Received request for ticker: ${ticker}`);

    // Fetch context
    const [newsResult, financialsResult] = await Promise.allSettled([
      fetchNews(ticker),
      fetchFinancials(ticker),
    ]);

    const news = newsResult.status === 'fulfilled' ? newsResult.value : `Failed to fetch news: ${newsResult.reason}`;
    const financials = financialsResult.status === 'fulfilled' ? financialsResult.value : `Failed to fetch financials: ${financialsResult.reason}`;

    // console.log(`[API Chatbot] Context fetched - News: ${news.substring(0, 100)}... | Financials: ${financials.substring(0, 100)}...`);


    // Compose context for the AI
    const systemPrompt = `
You are a helpful financial assistant embedded in a stock simulator website called StockQuest.
You provide insights about a specific company based on the provided context, which includes news and financial data.
Current Stock Ticker: ${ticker}

Context (provided as JSON strings):
### Latest News JSON:
${news}

### Financial Data JSON:
This JSON string contains an object with the following keys: 'overview', 'incomeStatement', 'balanceSheet', and 'cashFlow'.
Each key holds the corresponding data fetched from Alpha Vantage (which may include historical annual/quarterly reports or an error object).
${financials}
---
User Question: ${message}

Based *only* on the JSON data provided above (news and the structured financial data JSON), answer the user's question about ${ticker}.
Analyze the relevant sections (overview, income statement, balance sheet, cash flow) within the financial data JSON as needed.
If the data required to answer the question is not present in the provided JSONs, or if a specific section contains an error object, state that clearly. Do not make up information.
Keep your answers concise and directly related to the user's query and the provided data.
`;

    // Call OpenRouter API
    console.log("[API Chatbot] Calling OpenRouter API...");
    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // Recommended headers for OpenRouter
        "HTTP-Referer": `https://stockquest.com`, // Replace with your actual site URL
        "X-Title": `StockQuest Simulator`, // Replace with your site name
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-thinking-exp:free", // Consider starting with a cheaper model like gpt-3.5-turbo
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 5000, // Adjust token limit as needed
      }),
    });

    console.log(`[API Chatbot] OpenRouter response status: ${openRouterRes.status}`);

    if (!openRouterRes.ok) {
      const errorBody = await openRouterRes.text();
      console.error(`[API Chatbot] OpenRouter API Error: ${openRouterRes.status}`, errorBody);
      return NextResponse.json({ reply: "```\nError: Could not get a response from the AI service.\n```" }, { status: openRouterRes.status });
    }

    const openRouterData = await openRouterRes.json();
    const rawReply = openRouterData.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";

    // --- MODIFICATION START ---

    // --- MODIFICATION END ---

    console.log(`[API Chatbot] Sending reply for ${ticker}`);
    return NextResponse.json({ reply: rawReply }); // Send the wrapped reply

  } catch (error) {
    console.error("[API Chatbot] Internal Server Error:", error);
    // Wrap the error message as well
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ reply: "```\nError: An internal server error occurred.\n" + errorMessage + "\n```" }, { status: 500 });
  }
}

// Optional: Add a GET handler for testing or if needed later
// export async function GET(req: NextRequest) {
//   return NextResponse.json({ message: "Chatbot API is active. Use POST to send messages." });
// }