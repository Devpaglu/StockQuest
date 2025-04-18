// utils/fetchNews.ts
import "server-only"; // Ensure this runs only on the server

const NEWS_API_KEY = process.env.NEWS_API_KEY;

/**
 * Fetches news for a given ticker from News API and returns the entire
 * JSON response as a string.
 * @param ticker - The stock ticker symbol.
 * @returns A string containing the JSON response or an error message.
 */
export default async function fetchNews(ticker: string | null): Promise<string> {
  if (!ticker) {
    console.warn("[fetchNews] No ticker provided.");
    return JSON.stringify({ error: "No ticker provided for news search." });
  }

  if (!NEWS_API_KEY) {
    console.error("[fetchNews] NEWS_API_KEY is not set.");
    return JSON.stringify({ error: "News API key is not configured." });
  }

  // Construct the URL (using HTTPS)
  // Consider adding language or sorting preferences if needed
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    ticker + " stock" // Be more specific in the query
  )}&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`; // Limit page size

  console.log(`[fetchNews] Fetching news for ${ticker} from URL: ${url.replace(NEWS_API_KEY, '***')}`);

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

    // Check if the fetch itself failed (network issue, etc.)
    if (!res.ok) {
      console.error(`[fetchNews] API request failed for ${ticker} with status: ${res.status}`);
      // Try to get error details from News API if available
      let errorBody = { message: `HTTP error! status: ${res.status}` };
      try {
        errorBody = await res.json();
      } catch (e) { /* Ignore if body is not JSON */ }
      return JSON.stringify({ error: `News API request failed: ${errorBody.message || res.statusText}` });
    }

    // Parse the JSON response
    const data = await res.json();

    // News API specific check for error status in the response body
    if (data.status === 'error') {
        console.error(`[fetchNews] News API returned an error for ${ticker}: ${data.message}`);
        return JSON.stringify({ error: `News API error: ${data.message}` });
    }

    // Check if articles array exists and is not empty
    if (!data.articles || data.articles.length === 0) {
        console.log(`[fetchNews] No news articles found for ${ticker}.`);
        // Return the structure but indicate no articles found
        return JSON.stringify({ status: "ok", totalResults: 0, articles: [] });
    }

    console.log(`[fetchNews] Successfully fetched ${data.articles.length} news articles for ${ticker}.`);

    // Convert the entire successful JSON response object to a string
    // WARNING: This can be very long! Consider truncating or selecting relevant fields if needed.
    const jsonString = JSON.stringify(data);

    // Optional: Check length and truncate if necessary
    const MAX_LENGTH = 1000000; // Example max character length
    if (jsonString.length > MAX_LENGTH) {
         console.warn(`[fetchNews] News JSON string for ${ticker} truncated from ${jsonString.length} to ${MAX_LENGTH} chars.`);
         // A simple truncation might break the JSON structure.
         // A better approach might be to stringify only the first N articles.
         const truncatedData = { ...data, articles: data.articles.slice(0, 3) }; // Example: only first 3 articles
         return JSON.stringify(truncatedData);
         // Or return a simple truncated string (but it won't be valid JSON)
         // return jsonString.substring(0, MAX_LENGTH) + "... (truncated)";
    }


    return jsonString;

  } catch (error: any) {
    console.error(`[fetchNews] Failed to fetch or process news for ${ticker}:`, error);
    return JSON.stringify({ error: `Failed to fetch news: ${error.message || 'Unknown error'}` });
  }
}