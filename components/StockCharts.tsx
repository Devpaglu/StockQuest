// // components/stock-chart.tsx
// "use client"
// import { useEffect, useRef } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the necessary chart components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// export const StockChart = ({ priceHistory }: StockChartProps) => {
//   const chartRef = useRef(null);

//   // Prepare data for the chart
//   const chartData = {
//     labels: priceHistory.map((_, index) => `${index + 1}D`), // e.g., "1D", "2D", etc.
//     datasets: [
//       {
//         label: "Stock Price",
//         data: priceHistory,
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <div className="w-full">
//       <Line data={chartData} />
//     </div>
//   );
// };
