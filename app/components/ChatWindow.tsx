import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown, { Components } from 'react-markdown';

// Define the type for the props received by the custom 'code' component
type CustomCodeProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    inline?: boolean;
    node?: any;
    className?: string;
    children?: React.ReactNode;
};

// Define the components object using the Components type from react-markdown
const customComponents: Components = {
    code(props: CustomCodeProps) {
        const { node, inline, className, children, ...rest } = props;
        const match = /language-(\w+)/.exec(className || '');

        return !inline ? (
            <pre style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '5px',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: '10px 0' // Keep margin for block code
            }}>
                <code className={className} {...rest}>
                    {children}
                </code>
            </pre>
        ) : (
            <code className={className} style={{
                backgroundColor: 'rgba(27, 31, 35, 0.05)',
                borderRadius: '3px',
                padding: '0.2em 0.4em',
                fontSize: '85%'
            }} {...rest}>
                {children}
            </code>
        );
    }
    // Example: Adjust paragraph margins if needed, otherwise default is fine
    // p({ node, children }) {
    //   // Remove default browser margins or set specific ones
    //   return <p style={{ margin: '0 0 8px 0' }}>{children}</p>;
    // }
};


type Message = { role: "user" | "assistant"; content: string };

type Props = {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  onSend: (msg: string) => void;
  loading: boolean;
  ticker: string | null;
};


const ChatWindow: React.FC<Props> = ({ open, onClose, messages, onSend, loading, ticker }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
        onSend(input);
        setInput("");
    }
  };

  if (!open) return null;

  return (
    <div style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        // --- MODIFICATION START ---
        width: '400px', // Increased width
        height: '600px', // Increased height
        // --- MODIFICATION END ---
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        overflow: 'hidden',
        border: '1px solid #eee'
    }}>
        {/* Header */}
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 15px',
            backgroundColor: '#f1f1f1',
            borderBottom: '1px solid #ddd',
        }}>
            <span style={{ fontWeight: 'bold' }}>
                {ticker ? `${ticker} Insights` : 'Stock Insights'}
            </span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#555' }}>
                ×
            </button>
        </div>

        {/* Messages Area */}
        <div style={{
            flex: 1,
            padding: '15px', // Keep padding on the overall container
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: '#f9f9f9'
        }}>
            {messages.length === 0 && (
                 <div style={{ textAlign: 'center', color: '#888', marginTop: '20px', fontSize: '14px' }}>
                    {ticker ? `Ask me anything about ${ticker}!` : 'Navigate to a stock page (e.g., /stocks/AAPL) to get specific insights.'}
                </div>
            )}
            {messages.map((msg, idx) => (
                <div key={idx} style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                }}>
                    {/* Individual Message Bubble */}
                    <div style={{
                        backgroundColor: msg.role === 'user' ? '#d1eaff' : '#e9e9eb',
                        borderRadius: '10px',
                        // --- MODIFICATION START ---
                        // Conditionally apply padding: keep for user, remove for assistant
                        padding: msg.role === 'user' ? '8px 12px' : '0',
                        // --- MODIFICATION END ---
                        fontSize: '14px',
                        wordWrap: 'break-word',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        {/* ReactMarkdown content */}
                        {/* Add a wrapper div for assistant messages IF needed to control padding/margin *around* markdown content */}
                        {msg.role === 'assistant' ? (
                             <div style={{ padding: '0' }}> {/* Add padding *inside* the bubble, around the markdown content */}
                                <ReactMarkdown components={customComponents}>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            // User messages don't need the extra wrapper as padding is on the outer bubble
                            <ReactMarkdown components={customComponents}>
                                {msg.content}
                            </ReactMarkdown>
                        )}
                    </div>
                </div>
            ))}
            {loading && (
                <div style={{ alignSelf: 'flex-start', color: '#888', fontSize: '12px', paddingLeft: '12px' }}>
                    Assistant is thinking...
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #ddd', padding: '10px' }}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={ticker ? `Ask about ${ticker}...` : "Select a stock first..."}
                style={{ flex: 1, border: '1px solid #ccc', borderRadius: '4px', padding: '8px 12px', fontSize: '14px', marginRight: '10px', outline: 'none' }}
                disabled={loading || !ticker}
            />
            <button type="submit" style={{ padding: '8px 15px', border: 'none', borderRadius: '4px', backgroundColor: (loading || !ticker) ? '#ccc' : '#007bff', color: 'white', cursor: (loading || !ticker) ? 'not-allowed' : 'pointer', fontSize: '14px', opacity: (loading || !ticker) ? 0.6 : 1 }}
                disabled={loading || !ticker}>
                Send
            </button>
        </form>
    </div>
  );
};

export default ChatWindow;