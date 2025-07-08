import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Main from "./Main.jsx";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../Redux/Features/AuthSlice.js";
import { AddStock } from "../../Redux/Features/StocksCart.js";
const FrontPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookieToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
  
        if (cookieToken) {
          const response = await axios.get(
            'https://stock-profile-tracker-1.onrender.com/api/user/profiledata', 
            {
              headers: {
                Authorization: `Bearer ${cookieToken}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(response.data.data,"frontpage");
          const userData = {
            Name: response.data.data.Name || '',
            EmailID: response.data.data.EmailID || '',
            PhoneNo: response.data.data.PhoneNo || '0',
            Stocks: response.data.data.Stocks || [],
            TotalAmount: response.data.data.TotalAmount || 0,
            WalletAmount: response.data.data.WalletAmount || 0,
            isVerified: response.data.data.isVerified || false,
            netProfit: response.data.data.netProfit || 0,
            annualReturn: response.data.data.annualReturn || 0
          };
          
          response.data.data.Stocks.map((stock) => {
            dispatch(AddStock({
              symbol: stock.symbol,
              quantity: stock.quantity,
              avgPrice: stock.avgPrice,
              totalInvested: stock.totalInvested,
              lastUpdated: new Date().toISOString(),
              currentPrice: stock.avgPrice
            }))
          });
          
          dispatch(login({
            user: userData,
            token: cookieToken
          }));

          console.log(state.Auth)
        }
      } catch (error) {
        console.error('Authentication error:', error);
        dispatch(logout());
        // navigate('/login');
      }
    };
  
    fetchUserData();
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Main />
      <div className="top-200 w-full bg-blue-100 py-6 text-center text-gray-700">
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
    </>
  );
};
export default FrontPage;
