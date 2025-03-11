import React, { useState, useEffect } from "react";
import profileImage from "../../assets/user.png";
import Navbar from "../FrontPage/Navbar";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../Redux/Features/AuthSlice.js";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Profile = () => {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [prices, setPrices] = useState({});
  const [color, setColor] = useState("green");

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Portfolio Value",
        data: [120000, 135000, 142000, 155000, 165000, 175000],
        borderColor: "#16a34a",
        tension: 0.4,
      },
    ],
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookieToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (cookieToken) {
          const response = await axios.get(
            "http://localhost:3000/api/user/profiledata",
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

  useEffect(() => {
    const abortController = new AbortController();
    const fetchStockData = async () => {
      try {
        if (user.Stocks?.length > 0) {
          const promises = user.Stocks.map(async (stock) => {
            const response = await axios.get(
              "http://localhost:3000/service/stockprice",
              {
                params: { symbol:stock.symbol },
                signal: abortController.signal,
              }
            );
            const data = response.data.stockPrice;
            return {
              symbol: stock.symbol,
              price: parseFloat(data.substring(1,data.length).replace(/,/g, ''))
            };
          });

          const results = await Promise.all(promises);
          const newPrices = {};
          results.forEach(({ symbol, price }) => {
            newPrices[symbol] = price;
          });
          setPrices((prev) => ({ ...prev, ...newPrices }));
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
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
  }, [user.Stocks]);




  // useEffect(() => {
  //   const fetchStockData = async () => {
  //     try {
  //       if (user.Stocks?.length > 0) {
  //         const promises = user.Stocks.map(async (stock) => {
  //           const res = await axios.get(
  //             `http://localhost:3000/service/scrapweb/info?symbol=${stock.symbol}`
  //           );
  //           return {
  //             symbol: stock.symbol,
  //             price: parseFloat(res.data.stockData.topRatios[1].value),
  //           };
  //         });

  //         const results = await Promise.all(promises);
  //         const newPrices = {};
  //         results.forEach(({ symbol, price }) => {
  //           newPrices[symbol] = price;
  //         });
  //         setPrices((prev) => ({ ...prev, ...newPrices }));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching stock data:", error);
  //     }
  //   };

  //   fetchStockData();
  // }, [user.Stocks]);

  useEffect(() => {
    if (user.TotalAmount > 0) {
      const returnPercentage =
        ((user.annualReturn - user.TotalAmount) * 100) / user.TotalAmount;
      setColor(returnPercentage < 0 ? "red" : "green");
    }
  }, [user.annualReturn, user.TotalAmount]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar hide={false} />

      <div className="pt-20 px-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              src={profileImage}
              alt="User profile"
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-800">{user.Name}</h1>
              <p className="text-gray-600">Investor since 2020</p>
            </div>
          </div>

          <div className="bg-white p-6 text-center ml-40 rounded-xl shadow-sm w-full md:w-auto">
            <div>
              <p className="text-sm text-gray-500">Wallet Balance</p>
              <p className="text-2xl font-bold text-gray-800">
                ₹{user.WalletAmount?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm w-full md:w-auto">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Total Invested</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹
                  {(user.TotalAmount - user.WalletAmount)?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Annual Return</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{user.annualReturn?.toFixed(2) || "0.00"}
                </p>
                <p
                  className={`ml-8 ${
                    color === "green" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  (
                  {(
                    ((user.annualReturn - user.TotalAmount) * 100) /
                    (user.TotalAmount || 1)
                  )?.toFixed(2)}
                  %)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-black">
              Asset Allocation
            </h3>
            <div className="space-y-3 text-black">
              {user.Stocks?.map((asset) => {
                // Calculate total invested for this asset
                const assetInvestment = asset.quantity * asset.avgPrice;
                // Calculate total portfolio value (excluding wallet amount)
                const totalInvested = user.TotalAmount - user.WalletAmount;
                // Calculate percentage allocation
                const percentage =
                  totalInvested > 0
                    ? (assetInvestment / totalInvested) * 100
                    : 0;

                return (
                  <div
                    key={asset.symbol}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{asset.symbol}</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${percentage.toFixed(1)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-black">
              Performance Chart
            </h3>
            <div className="h-48">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-black">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Add Funds
              </button>
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Transfer Assets
              </button>
              <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                View Statements
              </button>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden text-black">
          <h3 className="text-lg font-semibold p-6 border-b">Your Holdings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Avg Cost
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Current
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Profit/Loss
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {user.Stocks?.map((investment) => {
                  const curPrice =
                    prices[investment.symbol] || investment.avgPrice;
                  const profit =
                    (curPrice - investment.avgPrice) * investment.quantity;
                  const profitPercentage = (
                    ((curPrice - investment.avgPrice) / investment.avgPrice) *
                    100
                  ).toFixed(2);

                  return (
                    <tr
                      key={investment.symbol}
                      onClick={() => {
                        navigate(`/stock/${investment.symbol}`);
                      }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {investment.symbol}
                            </div>
                            <div className="text-sm text-gray-500">
                              {investment.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {investment.quantity}
                      </td>
                      <td className="px-6 py-4 text-right">
                        ₹{investment.avgPrice?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        ₹{curPrice}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`${
                            profit >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          ₹{(curPrice - investment.avgPrice).toFixed(2)} ({profitPercentage}%)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
