import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TradingAnalysis = () => {
  const navigate = useNavigate();
  const [timeFrame, setTimeFrame] = useState("1D"); // 1D, 1W, 1M, 1Y

  const chartData = [
    { time: "09:00", price: 145.0 },
    { time: "10:00", price: 146.5 },
    { time: "11:00", price: 147.2 },
    { time: "12:00", price: 146.8 },
    { time: "13:00", price: 147.5 },
    { time: "14:00", price: 148.0 },
    { time: "15:00", price: 148.3 },
    { time: "16:00", price: 147.9 },
  ];

  const portfolioPerformance = [
    { metric: "Total Return", value: "+12.5%" },
    { metric: "Annualized Return", value: "+15.8%" },
    { metric: "Volatility", value: "18.2%" },
    { metric: "Sharpe Ratio", value: "1.45" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1
              className="text-2xl font-bold text-emerald-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              StockTrack Pro
            </h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-emerald-600 mb-4">
            Trading Analysis
          </h1>
          <p className="text-gray-600 text-xl">
            Gain insights and optimize your trading strategies
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Time Frame Selector */}
        <section className="mb-8">
          <div className="flex justify-center space-x-4">
            {["1D", "1W", "1M", "1Y"].map((frame) => (
              <button
                key={frame}
                onClick={() => setTimeFrame(frame)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeFrame === frame
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {frame}
              </button>
            ))}
          </div>
        </section>

        {/* Price Chart */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6">
              Price Chart (AAPL)
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Portfolio Performance */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
            Portfolio Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioPerformance.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                  {item.metric}
                </h3>
                <p className="text-gray-600 text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trade History */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
            Trade History
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-emerald-600">Symbol</th>
                  <th className="text-left py-2 text-emerald-600">Action</th>
                  <th className="text-left py-2 text-emerald-600">Quantity</th>
                  <th className="text-left py-2 text-emerald-600">Price</th>
                  <th className="text-left py-2 text-emerald-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    symbol: "AAPL",
                    action: "Buy",
                    quantity: 10,
                    price: 145.0,
                    date: "2023-10-01",
                  },
                  {
                    symbol: "GOOGL",
                    action: "Sell",
                    quantity: 5,
                    price: 2750.0,
                    date: "2023-10-02",
                  },
                  {
                    symbol: "TSLA",
                    action: "Buy",
                    quantity: 20,
                    price: 850.0,
                    date: "2023-10-03",
                  },
                ].map((trade, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 text-gray-600">{trade.symbol}</td>
                    <td
                      className={`py-4 ${
                        trade.action === "Buy"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {trade.action}
                    </td>
                    <td className="py-4 text-gray-600">{trade.quantity}</td>
                    <td className="py-4 text-gray-600">${trade.price}</td>
                    <td className="py-4 text-gray-600">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            &copy; 2023 StockTrack Pro. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Disclaimer: Trading involves risk. StockTrack Pro does not provide
            investment advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TradingAnalysis;