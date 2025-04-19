import { NextRequest } from "next/server";

export const runtime = "edge"; // for streaming support

export async function POST(req: NextRequest) {
  try {
    const trade = await req.json();

    const prompt = `
You are a stock market expert AI. Please analyze my trade as a coach would analyze a move, highlighting strengths, weaknesses, and behavioral factors:
Stock: ${trade.stockSymbol}
Quantity: ${trade.quantity}
Buy Price: ₹${trade.priceAtTrade}
Date: ${trade.createdAt}
Current Date: Sunday, April 20, 2025, 12:51 AM IST
Please provide:
Recent Stock Performance:
Briefly summarize the stock’s recent price trend, volatility, and any significant news or events.
Move Evaluation:
Rate my trade as a “Strong Move,” “Inaccuracy,” “Mistake,” or “Blunder,” with reasoning.
Compare my entry to the stock’s recent momentum and market sentiment.
Behavioral Factors:
Did my trade show signs of herd behavior, panic exit, overconfidence, or a short-term focus?
Point out any cognitive biases that may have influenced this decision.
Risks & Opportunities:
List the key risks and potential upsides associated with this position, considering current market conditions.
Actionable Suggestions:
Recommend specific next steps (e.g., hold, average, exit, set stop-loss), tailored to both the stock’s outlook and my trading psychology.
Suggest how to avoid common behavioral mistakes in future trades.
`;

    console.log("Prompt:", prompt);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "", // optional
        "X-Title": "" // optional
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-thinking-exp:free",
        messages: [{ role: "user", content: prompt }],
        stream: true,
        max_tokens: 8000

      })
    });

    console.log("OpenRouter response status:", response.status);

    // Optionally log the headers or a snippet of the body
    // For streaming, you can't easily log the whole body, but you can log headers
    console.log("OpenRouter response headers:", response.headers);

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });
  } catch (error) {
    console.error("Error in analyse-trade API route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}