import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import candlestickImg from "../../assets/candlestick.png";
import lineChartImg from "../../assets/line-chart.png";
import fullScreen from "../../assets/fullscreen.png";
import ReactApexChart from "react-apexcharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../FrontPage/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AddStock, InitTransaction } from "../../Redux/Features/StocksCart";
import { login, logout } from "../../Redux/Features/AuthSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

const LineChart = () => {
  const { symbol } = useParams();
  const chartRef = useRef(null);
  const [stockData, setStockData] = useState({
    symbol: symbol,
    price: 0,
    change: 0,
    changePercent: 0,
    historical: [],
    high: 0,
    low: 0,
    marketCap: "0",
    peRatio: "0",
    roce: "0",
  });
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stock = useSelector((state) => state.StockCart.stockList);
  const refb = useRef(null);
  const [chart, setChart] = useState("line");

  // Reset historical data and symbol when symbol changes
  useEffect(() => {
    setStockData((prev) => ({
      ...prev,
      symbol: symbol,
      historical: [],
    }));
  }, [symbol]);

  useEffect(() => {
    const abortController = new AbortController();

    console.log(new Date().getDay(), "qqqqqqqqqqqqq");
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/service/stockprice",
          {
            params: { symbol },
            signal: abortController.signal,
          }
        );
        const data = response.data;

        const parseCurrency = (str) => parseFloat(str.replace(/[^0-9.]/g, ""));
        const stockPrice = parseCurrency(data.stockPrice);
        const prevClose = parseCurrency(data.prevClose);
        const change = stockPrice - prevClose;
        const changePercent = (change / prevClose) * 100;

        const [todayLow, todayHigh] = data.todayRange
          .split(" - ")
          .map(parseCurrency);
        const [yearLow, yearHigh] = data.yearRange
          .split(" - ")
          .map(parseCurrency);

        setStockData((prev) => {
          const newHistorical = [
            ...prev.historical,
            { date: new Date(), close: stockPrice },
          ];
          if (newHistorical.length > 50) newHistorical.shift();

          return {
            ...prev,
            symbol: symbol,
            price: stockPrice,
            change: change,
            changePercent: changePercent,
            high: todayHigh,
            low: todayLow,
            marketCap: data.marketCap,
            peRatio: data.peRatio,
            historical: newHistorical,
          };
        });
        setLoading(false);
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching stock data:", error);
        }
      }
    };
    let intervalId = null;
    const day = new Date();
    if (
      day.getDay() >= 0 &&
      day.getDay() <= 5 &&
      day.getHours() >= 9 &&
      day.getHours() <= 15
    ) {
      intervalId = setInterval(fetchStockData, 5000);
    } else {
      fetchStockData();
    }

    return () => {
      abortController.abort();
      clearInterval(intervalId);
    };
  }, [symbol]);

  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/service/stocknews?symbol=${symbol}`
        );
        console.log(response.data.news);
        setNews(response.data.news);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [symbol]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookieToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (cookieToken) {
          const response = await axios.get(
            "http://localhost:8080/api/user/profiledata",
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

          response.data.data.Stocks.forEach((stock) => {
            dispatch(
              AddStock({
                symbol: stock.symbol,
                quantity: stock.quantity,
                avgPrice: stock.avgPrice,
                totalInvested: stock.totalInvested,
                lastUpdated: new Date().toISOString(),
                currentPrice: stock.avgPrice,
              })
            );
          });

          dispatch(login({ user: userData, token: cookieToken }));
        }
      } catch (error) {
        console.error("Authentication error:", error);
        dispatch(logout());
      }
    };

    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    const calculatedPrice = price || stockData.price;
    const calculatedQuantity = parseFloat(quantity) || 0;
    setEstimatedCost(calculatedQuantity * calculatedPrice);
  }, [quantity, price, stockData.price]);

  const handleBuy = () => {
    if (user.WalletAmount >= estimatedCost && estimatedCost > 0) {
      dispatch(
        InitTransaction({
          Symbol: stockData.symbol,
          Quantity: quantity,
          avgPrice: stockData.price,
          estimatedCost: estimatedCost,
          type: "BUY",
        })
      );
      navigate("/buy/verification");
    }
  };
  const handleSell = () => {
    console.log("Sell order submitted:", {
      quantity,
      price: price || stockData.price,
      total: estimatedCost,
    });
    console.log(user);
    const stock = user.Stocks.filter((stock) => {
      return stockData.symbol === stock.symbol;
    })[0];
    console.log(stock);
    if (stock && stock.quantity >= quantity - "0" && quantity - "0" > 0) {
      dispatch(
        InitTransaction({
          Symbol: stockData.symbol,
          Quantity: quantity - "0",
          avgPrice: stockData.price,
          estimatedCost: estimatedCost,
          type: "SELL",
        })
      );
      console.log("done");
      navigate("/sell/verification");
    }
  };

  const chartData = {
    datasets: [
      {
        label: "Price (₹)",
        data: stockData.historical.map((data) => ({
          x: data.date,
          y: data.close,
        })),
        borderColor: stockData.change >= 0 ? "#16a34a" : "#dc2626",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(
            0,
            stockData.change >= 0 ? "#16a34a22" : "#dc262622"
          );
          gradient.addColorStop(1, "#ffffff00");
          return gradient;
        },
        tension: 0.1,
        fill: true,
        pointRadius: 0,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1f2937",
        titleColor: "#f3f4f6",
        bodyColor: "#f3f4f6",
        borderColor: "#374151",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (items) =>
            items[0]?.parsed.x
              ? new Date(items[0].parsed.x).toLocaleTimeString()
              : "",
          label: (context) => `₹${context.parsed.y?.toFixed(2) || "0.00"}`,
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          tooltipFormat: "HH:mm:ss",
          displayFormats: {
            minute: "HH:mm",
          },
        },
        grid: { display: false },
      },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: { callback: (value) => `₹${value}` },
      },
    },
    animation: {
      duration: 1000,
      easing: "linear",
    },
    interaction: { mode: "nearest", intersect: false },
  };

  return (
    <>
      <Navbar hide={false} />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {stockData.symbol}
                  <span className="ml-2 text-lg text-gray-600">NSE</span>
                </h1>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{stockData.price.toFixed(2)}
                </div>
                <div
                  className={`text-sm font-medium ${
                    stockData.change >= 0 ? "text-green-700" : "text-red-700"
                  } bg-${
                    stockData.change >= 0 ? "green" : "red"
                  }-100 px-2 py-1 rounded-full inline-block mt-1`}
                >
                  {stockData.change >= 0 ? "+" : "-"}₹
                  {Math.abs(stockData.change).toFixed(2)} (
                  {Math.abs(stockData.changePercent).toFixed(2)}%)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-gray-600 mb-1">Market Cap</div>
                <div className="font-semibold text-gray-800">
                  {stockData.marketCap}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-gray-600 mb-1">Today's High</div>
                <div className="font-semibold text-gray-800">
                  ₹{stockData.high?.toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-gray-600 mb-1">Today's Low</div>
                <div className="font-semibold text-gray-800">
                  ₹{stockData.low?.toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-gray-600 mb-1">P/E Ratio</div>
                <div className="font-semibold text-gray-800">
                  {stockData.peRatio}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section: Chart Display */}
            <div className="lg:col-span-2 bg-white p-6 pb-20 rounded-lg shadow-sm text-black">
              <div className="h-96">
                {/* Chart Type Selection */}
                <div className="flex items-center justify-center gap-4 mb-4 ml-160">
                <button
                    onClick={() => setChart("line")}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow"
                  >
                    <img className="size-4" src={fullScreen} alt="fullscreen" />
                  </button>
                  <button
                    onClick={() => setChart("line")}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow"
                  >
                    <img className="size-4" src={lineChartImg} alt="line" />
                  </button>
                  <button
                    onClick={() => setChart("candlestick")}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow"
                  >
                    <img className="size-4" src={candlestickImg} alt="candle" />
                  </button>
                </div>

                {/* Chart Display */}
                {chart === "line" ? (
                  <Line
                    key={stockData.symbol}
                    data={chartData}
                    options={chartOptions}
                  />
                ) : (
                  <ReactApexChart
                      options={{
                        chart: {
                          type: "candlestick",
                          height: 350,
                          background: '#fff',
                          toolbar: { show: false }
                        },
                        xaxis: { type: "datetime" },
                        yaxis: { tooltip: { enabled: true } },
                        plotOptions: {
                          candlestick: {
                            colors: {
                              upward: '#22C55E',
                              downward: '#EF4444'
                            }
                          }
                        }
                      }}
                      series={[{
                        data: stockData.historical.map(item => ({
                          x: item.date,
                          y: [item.close - 2, item.close + 2, item.close - 1, item.close + 1]
                        }))
                      }]}
                      type="candlestick"
                      height="100%"
                    />
                )}
              </div>
            </div>

            {/* Right Section: Order Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Order Type Selection */}
              <div className="flex gap-2 mb-6">
                <button
                  className={`flex-1 py-2 rounded transition-colors ${
                    orderType === "market"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setOrderType("market")}
                >
                  Market
                </button>
                <button
                  className={`flex-1 py-2 rounded transition-colors ${
                    orderType === "limit"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setOrderType("limit")}
                >
                  Limit
                </button>
              </div>

              {/* Order Inputs */}
              <div className="space-y-4">
                {orderType === "limit" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Limit Price (₹)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 text-black border rounded focus:ring-2 focus:ring-green-500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={`Current: ₹${stockData.price.toFixed(2)}`}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-green-500"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      if (refb.current) {
                        refb.current.style.backgroundColor =
                          user.WalletAmount <
                          e.target.value * (price || stockData.price)
                            ? "#ACE1AF"
                            : "green";
                      }
                    }}
                    placeholder="Enter shares"
                  />
                </div>

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span className="font-medium">Available Cash</span>
                    <span className="font-semibold">
                      ₹{user.WalletAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span className="font-medium">Estimated Cost</span>
                    <span className="font-semibold">
                      ₹{estimatedCost.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Buy & Sell Buttons */}
                <div className="space-y-2">
                  <button
                    ref={refb}
                    onClick={handleBuy}
                    className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Buy {stockData.symbol}
                  </button>
                  <button
                    onClick={handleSell}
                    className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Sell {stockData.symbol}
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Market orders execute immediately at current price. Limit
                  orders only execute at specified price or better.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Latest Stock News
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 border border-gray-100"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-2 whitespace-pre-line">
                    {item.title.replace(/\n/g, " ")}
                  </h3>
                </a>

                <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                  <span className="font-medium text-blue-600">
                    {item.source}
                  </span>
                  <span className="text-gray-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          {news.length === 0 && (
            <div className="text-center p-6 text-gray-500">
              No news available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LineChart;
