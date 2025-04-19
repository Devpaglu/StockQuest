// components/challenges.ts

export interface Challenge {
    id: number;
    question: string;
    options: string[];
    correctAnswerIndex: number;
  }
  
  // Add more questions!
  export const challenges: Challenge[] = [
      {
      id: 1,
      question: "What does 'bull market' signify?",
      options: [
        "Prices are falling",
        "Prices are expected to rise",
        "Market is stagnant",
        "High trading volume only",
      ],
      correctAnswerIndex: 1,
    },
    {
      id: 2,
      question: "What is a 'dividend'?",
      options: [
        "A loan from the company",
        "A tax paid by shareholders",
        "A share of company profits paid to shareholders",
        "A fee for trading stocks",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 3,
      question: "What does IPO stand for?",
      options: [
        "Internal Profit Offering",
        "Initial Public Offering",
        "Immediate Purchase Order",
        "Indexed Portfolio Option",
      ],
      correctAnswerIndex: 1,
    },
    {
      id: 4,
      question: "Which of these is generally considered the riskiest investment?",
      options: [
          "Government Bonds",
          "Blue-chip Stocks",
          "Penny Stocks",
          "Mutual Funds",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 5,
      question: "What is diversification in investing?",
      options: [
          "Investing all money in one stock",
          "Spreading investments across various assets",
          "Only investing in technology stocks",
          "Timing the market perfectly",
      ],
      correctAnswerIndex: 1,
    },
    {
      id: 6,
      question: "What does 'P/E Ratio' measure?",
      options: [
          "Profit Efficiency",
          "Price-to-Earnings",
          "Portfolio Equity",
          "Past Earnings",
      ],
      correctAnswerIndex: 1,
    },
    {
      id: 7,
      question: "A 'bear market' is characterized by:",
      options: [
          "Rising prices",
          "Stable prices",
          "Falling prices and pessimism",
          "Increased investor confidence",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 8,
      question: "What is a 'mutual fund'?",
      options: [
          "A fund owned by one person",
          "A fund investing in only one stock",
          "A fund that pools money from many investors to buy securities",
          "A type of savings account",
      ],
      correctAnswerIndex: 2,
    },
     {
      id: 9,
      question: "What is 'inflation'?",
      options: [
          "Decrease in the general price level",
          "Increase in the purchasing power of money",
          "Increase in the general price level, reducing purchasing power",
          "A type of stock",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 10,
      question: "What does 'Liquidity' refer to in finance?",
      options: [
          "How quickly an asset can be converted to cash without affecting its price",
          "The total debt of a company",
          "The profitability of an asset",
          "The amount of water a company owns",
      ],
      correctAnswerIndex: 0,
    }
    // Add many more diverse questions here...
  ];
  
  // Function to get the challenge for a specific date (using IST)
  export function getDailyChallenge(date: Date): Challenge {
      // Ensure we're using IST (UTC+5:30)
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istTime = date.getTime() + istOffset;
      const istDate = new Date(istTime);
  
      // Use day of the year in IST for consistent daily selection
      const startOfYear = new Date(Date.UTC(istDate.getUTCFullYear(), 0, 0));
      const diff = istDate.getTime() - startOfYear.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
  
      const challengeIndex = dayOfYear % challenges.length;
      // Ensure the index is valid, fallback to 0 if something goes wrong
      return challenges[challengeIndex] || challenges[0];
  }
  
  // Function to get today's date string in YYYY-MM-DD format for IST
  export function getTodayDateStringIST(): string {
      const now = new Date();
      // Use Intl.DateTimeFormat for reliable time zone handling
      const formatter = new Intl.DateTimeFormat('en-CA', { // en-CA gives YYYY-MM-DD
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
      });
      return formatter.format(now);
  }