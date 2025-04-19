// src/app/stocks/[symbol]/components/news.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ExternalLink } from "lucide-react";

// --- Define or Import News Type (Keep here or move to shared types) ---
interface NewsArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}
// --- End News Type ---

// --- Props Interface for the Component ---
interface NewsSectionProps {
  symbol: string;
  isLoading: boolean;
  error: string | null;
  articles: NewsArticle[];
}

// --- The Component ---
export function NewsSection({
  symbol,
  isLoading,
  error,
  articles,
}: NewsSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Latest News</h3>
        {isLoading && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mr-2" />
            <p className="text-muted-foreground">Loading news...</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="text-center py-6 px-4 bg-destructive/10 border border-destructive/30 rounded-md">
            <p className="text-destructive font-medium">Error Loading News</p>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        )}
        {!isLoading && !error && articles.length === 0 && (
          <p className="text-muted-foreground text-center py-6">No relevant news found for {symbol}.</p>
        )}
        {!isLoading && !error && articles.length > 0 && (
          <ul className="space-y-5">
            {articles.map((article, index) => (
              <li key={article.url || `news-${index}`} className="pb-5 border-b border-border last:border-b-0">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="group mb-1 inline-block">
                  <h4 className="font-semibold text-base leading-snug group-hover:text-primary group-hover:underline transition-colors duration-150">
                    {article.title || 'No title available'}
                  </h4>
                </a>
                {article.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.description}</p>
                )}
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground/80">
                  <span className="truncate pr-2">{article.source?.name || 'Unknown Source'}</span>
                  {article.publishedAt && (
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-primary transition-colors flex-shrink-0">
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}