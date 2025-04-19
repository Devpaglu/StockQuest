"use client";
import React, { useContext, useEffect, useState } from "react";
import { TradeContext } from "./TradeContext";
import ReactMarkdown from "react-markdown";

const Analyser = () => {
  const { selectedTrade } = useContext(TradeContext);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedTrade) {
      setAnalysis("");
      return;
    }
    setLoading(true);
    setAnalysis("");

    const fetchAnalysis = async () => {
      const res = await fetch("/api/analyse-trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedTrade),
      });

      if (!res.body) {
        setAnalysis("No response body.");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // OpenRouter streams as SSE: parse lines starting with "data: "
        chunk.split("\n").forEach((line) => {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") return;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                result += content;
                setAnalysis((prev) => prev + content);
              }
            } catch {
              // Ignore parsing errors
            }
          }
        });
      }
      setLoading(false);
    };

    fetchAnalysis();
  }, [selectedTrade]);

  return (
    <div className="w-1/2 p-4">
      <h2 className="font-bold mb-2">AI Trade Analysis</h2>
      {!selectedTrade && <div>Select a trade to analyse.</div>}
      {loading && <div>Analysing...</div>}
      {analysis && (
        <div className="bg-gray-50 rounded p-4 prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Analyser;