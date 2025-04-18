"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ChatIcon from "./ChatIcon";
import ChatWindow from "./ChatWindow";

type Message = { role: "user" | "assistant"; content: string };

const getTickerFromPath = (path: string): string | null => {
  if (!path) return null;
  // Updated regex to be less strict, allows for trailing slashes etc.
  const match = path.match(/\/stocks\/([A-Za-z0-9\.\-]+)/);
  return match ? match[1].toUpperCase() : null; // Extract and uppercase the ticker
};

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]); // Add initial type
  const [loading, setLoading] = useState(false);
  const [currentTicker, setCurrentTicker] = useState<string | null>(null);

  const pathname = usePathname();

  // Effect to update ticker and clear messages when path changes
  useEffect(() => {
    const newTicker = getTickerFromPath(pathname);
    console.log("Pathname changed:", pathname, "Detected ticker:", newTicker);
    if (newTicker !== currentTicker) {
      setCurrentTicker(newTicker);
      setMessages([]); // Clear messages when ticker changes
      setOpen(false); // Optionally close window on ticker change
    }
  }, [pathname, currentTicker]); // Add currentTicker to dependency array


  const handleSend = async (msg: string) => {
    if (!currentTicker) {
        console.error("Cannot send message, no ticker detected.");
        // Optionally show an error message to the user
        setMessages(prev => [...prev, { role: "assistant", content: "```\nPlease navigate to a specific stock page first (e.g., /stocks/AAPL).\n```"}]);
        return;
    }

    const newUserMessage: Message = { role: "user", content: msg };
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      console.log(`Sending message for ticker ${currentTicker}: ${msg}`);
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, ticker: currentTicker }), // Use currentTicker state
      });

      if (!res.ok) {
          // Handle HTTP errors (like 404, 500) from the API route
          const errorData = await res.json().catch(() => ({ reply: "```\nError: Received an invalid response from the server.\n```" })); // Fallback if response is not JSON
          console.error("API Error Response:", res.status, errorData);
           setMessages(prev => [...prev, { role: "assistant", content: errorData.reply || `\`\`\`\nError: ${res.statusText}\n\`\`\`` }]);
      } else {
          const data = await res.json();
          console.log("Received API response:", data);
          setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      }

    } catch (e) {
      console.error("Failed to fetch chatbot response:", e);
      // Wrap fetch error message
      const errorContent = e instanceof Error ? e.message : "An unexpected error occurred.";
      setMessages(prev => [...prev, { role: "assistant", content: `\`\`\`\nSorry, I encountered an error: ${errorContent}\n\`\`\`` }]);
    } finally {
        setLoading(false);
    }
  };

  // Only render the chatbot components if a ticker is detected or potentially always show the icon
  // If you want the icon always visible, remove the conditional rendering around ChatIcon
  // const showChatbot = !!currentTicker; // Example: only show if on a stock page

  return (
    // Use a Fragment <> or a div container
    <>
      {/* Conditionally render ChatIcon, or always render it */}
      {/* {showChatbot && ( */}
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
            <ChatIcon onClick={() => setOpen(prev => !prev)} />
        </div>
      {/* )} */}

      {/* Pass the currentTicker to the ChatWindow */}
      <ChatWindow
        open={open}
        onClose={() => setOpen(false)}
        messages={messages}
        onSend={handleSend}
        loading={loading}
        ticker={currentTicker} // Pass ticker here
      />
    </>
  );
};

export default Chatbot;