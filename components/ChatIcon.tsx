import React from "react";

type Props = {
  onClick: () => void;
};

const ChatIcon: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "#0070f3",
      color: "#fff",
      border: "none",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      zIndex: 1000,
      cursor: "pointer",
      fontSize: 28,
    }}
    aria-label="Open chatbot"
  >
    💬
  </button>
);

export default ChatIcon;
