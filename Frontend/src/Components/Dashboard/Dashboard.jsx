import React, { useState, useEffect } from "react";
import Navbar from "../FrontPage/Navbar.jsx";
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios'
import { useDispatch,useSelector } from "react-redux";
import { login,logout } from "../../Redux/Features/AuthSlice.js";
import {
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaCoins,
  FaToolbox,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("stocks");
  const [timeRange, setTimeRange] = useState("1D");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const cookieToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
  
          if (cookieToken) {
            const response = await axios.get(
              "https://stock-profile-tracker-1.onrender.com/api/user/profiledata",
              {
                headers: {
                  Authorization: `Bearer ${cookieToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
  
            const userData = {
              Name: response.data.data.Name || "",
              EmailID: response.data.data.EmailID || "",
              PhoneNo: response.data.data.PhoneNo || "0",
              Stocks: response.data.data.Stocks || [],
              TotalAmount: response.data.data.TotalAmount || 0,
              WalletAmount: response.data.data.WalletAmount || 0,
              isVerified: response.data.data.isVerified || false,
              netProfit: response.data.data.netProfit || 0,
              annualReturn: response.data.data.annualReturn || 0,
            };
  
            dispatch(login({ user: userData, token: cookieToken }));
          }
        } catch (error) {
          console.error("Authentication error:", error);
          dispatch(logout());
          navigate("/");
        }
      };
  
      fetchUserData();
    }, [dispatch, navigate]);
  
  // Sample data - replace with real API data
  const indices = [
    {
      name: "S&P 500",
      value: "4,567.89",
      change: "+1.23%",
      chartData: [
        /*...*/
      ],
    },
    {
      name: "NASDAQ",
      value: "14,322.12",
      change: "-0.45%",
      chartData: [
        /*...*/
      ],
    },
    {
      name: "Dow Jones",
      value: "34,567.89",
      change: "+0.78%",
      chartData: [
        /*...*/
      ],
    },
    {
      name: "Nifty 50",
      value: "18,345.67",
      change: "+2.15%",
      chartData: [
        /*...*/
      ],
    },
    {
      name: "FTSE 100",
      value: "7,654.32",
      change: "-0.32%",
      chartData: [
        /*...*/
      ],
    },
  ];

  const topGainers = [
    { symbol: "AAPL", price: "189.34", change: "+3.45%" },
    { symbol: "TSLA", price: "267.89", change: "+5.12%" },
    { symbol: "AMZN", price: "134.56", change: "+2.89%" },
    { symbol: "GOOGL", price: "2789.45", change: "+1.67%" },
    { symbol: "MSFT", price: "345.67", change: "+4.23%" },
  ];

  const marketData = {
    labels: [
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
    ],
    datasets: [
      {
        label: "S&P 500",
        data: [4530, 4545, 4560, 4550, 4575, 4580],
        borderColor: "#4CAF50",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="">
        <Navbar display="block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Overview Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Market Overview
            </h1>
            <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            {["1D", "1W", "1M", "1Y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">S&P 500 Performance</h2>
          <div className="h-96">
            <Line
              data={marketData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { border: { dash: [4] } },
                },
              }}
            />
          </div>
        </div>

        {/* Indices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {indices.map((index, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{index.name}</h3>
                  <p className="text-2xl font-bold mt-2">{index.value}</p>
                </div>
                <span
                  className={`text-sm ${
                    index.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {index.change}
                </span>
              </div>
              <div className="h-20 mt-4">
                <Line
                  data={{
                    labels: [],
                    datasets: [
                      {
                        data: index.chartData,
                        borderColor: index.change.startsWith("+")
                          ? "#4CAF50"
                          : "#F44336",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    elements: { point: { radius: 0 } },
                    scales: { x: { display: false }, y: { display: false } },
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Top Gainers/Losers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Top Gainers</h2>
              <button className="text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            {topGainers.map((stock, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-0"
                onClick={()=>navigate(`/stock/${stock.symbol}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaChartLine className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{stock.symbol}</h3>
                    <p className="text-sm text-gray-500">NYSE</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{stock.price}</p>
                  <span className="text-green-500 flex items-center gap-1">
                    <FaArrowUp /> {stock.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Market Overview Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Top Loosers</h2>
              <button className="text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            {topGainers.map((stock, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-0"
                onClick={()=>navigate(`/stock/${stock.symbol}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaChartLine className="text-red-600 rotate-180" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{stock.symbol}</h3>
                    <p className="text-sm text-gray-500">NYSE</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{stock.price}</p>
                  <span className="text-red-500 flex items-center gap-1">
                    <FaArrowDown /> {stock.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["AI Predictions", "Portfolio Builder", "Options Calculator"].map(
              (tool, i) => (
                <div
                  key={i}
                  className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FaToolbox className="text-blue-600 text-xl" />
                    </div>
                    <h3 className="font-semibold">{tool}</h3>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {tool === "AI Predictions"
                      ? "AI-powered stock price predictions and trend analysis"
                      : tool === "Portfolio Builder"
                      ? "Build and optimize your investment portfolio"
                      : "Advanced options trading calculator with Greeks"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm mt-10">
          <h2 className="text-xl font-semibold mb-6">Trading Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["AI Predictions", "Portfolio Builder", "Options Calculator"].map(
              (tool, i) => (
                <div
                  key={i}
                  className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FaToolbox className="text-blue-600 text-xl" />
                    </div>
                    <h3 className="font-semibold">{tool}</h3>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {tool === "AI Predictions"
                      ? "AI-powered stock price predictions and trend analysis"
                      : tool === "Portfolio Builder"
                      ? "Build and optimize your investment portfolio"
                      : "Advanced options trading calculator with Greeks"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
        {/* Tools & Resources */}
        <div className="bg-white p-6 rounded-xl shadow-sm mt-10">
          <h2 className="text-xl font-semibold mb-6">Trading Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["AI Predictions", "Portfolio Builder", "Options Calculator"].map(
              (tool, i) => (
                <div
                  key={i}
                  className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FaToolbox className="text-blue-600 text-xl" />
                    </div>
                    <h3 className="font-semibold">{tool}</h3>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {tool === "AI Predictions"
                      ? "AI-powered stock price predictions and trend analysis"
                      : tool === "Portfolio Builder"
                      ? "Build and optimize your investment portfolio"
                      : "Advanced options trading calculator with Greeks"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">StockTrack Pro</h3>
              <p className="text-gray-400 text-sm">
                Empowering traders with real-time insights and advanced
                analytics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Markets</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Stocks", "Options", "Futures", "Forex"].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Research", "Education", "Blog", "Webinars"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        className="hover:text-blue-400 transition-colors"
                        onClick={()=>{
                          if(item==="Education"){
                            navigate('/knowledge_center');
                          }
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Disclosures",
                  "Cookie Settings",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} StockTrack Pro. All rights reserved.
            </p>
            <p className="mt-2">
              Data provided by financial data providers. Delayed by 15 minutes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
