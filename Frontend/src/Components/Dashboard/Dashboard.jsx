import React from "react";
import Navbar from "../FrontPage/Navbar.jsx";
const Dashboard = () => {
  return (
    <div>
      <Navbar hide={false} />
      <div
        style={{
          fontFamily: "cursive",
        }}
        className="w-250 ml-10"
      >
        <div className="w-60 flex flex-row justify-between mt-10">
          <div className="w-20 border-b-4 ml-5 text-center border-green-500 font-bold text-xl">Stocks</div>
          <div className="w-40 border-b-4 ml-5 text-center border-green-400 font-bold text-xl">Mutual Funds</div>
        </div>
        <hr />
        <div className="flex flex-row justify-between text-xl font-bold mt-10">
          <div>Indices</div>
          <div>All Indices</div>
        </div>
        <div className="flex flex-row justify-evenly overflow-y gap-5 mb-8 mt-10 ">
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
        </div>
        <div className="flex flex-row justify-between text-xl font-bold mt-10 mb-5">Most Traded Stocks</div>
        <div className="flex flex-row justify-evenly overflow-y gap-5 mb-8 mt-10 ">
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
        </div>
        <div className="flex flex-row justify-between text-xl font-bold mt-10 mb-5">Products & tools</div>
        <div className="flex flex-row justify-evenly overflow-y gap-5 mb-8 mt-10">
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
        </div>
        <div className="flex flex-row justify-between text-xl font-bold mt-10 mb-5">Top Gainers</div>
        <div className="flex flex-row justify-evenly overflow-y gap-5 mb-8 mt-10">
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
          <div className="w-30 h-10 bg-white rounded-sm shadow-sm text-center">
            Index1
          </div>
        </div>
        
      </div>
      <div className="mt-10 absolute top-200 w-full bg-blue-100 py-6 text-center text-gray-700">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-blue-800">
            StockTrack Pro
          </h2>
          <p className="mt-2 text-sm">
            Empowering traders and investors with real-time market insights,
            stock analysis, and AI-driven predictions.
          </p>

          <div className="mt-4 flex justify-center gap-6 text-gray-600 text-sm">
            <a href="#" className="hover:text-blue-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact Us
            </a>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} StockTrack Pro. All rights reserved.
            Stock trading involves risk. Past performance is not indicative of
            future results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
