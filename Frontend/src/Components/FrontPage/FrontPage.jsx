import React from "react";
import Navbar from "./Navbar.jsx";
import Main from "./Main.jsx";
const FrontPage = () => {
  return (
    <>
      <Navbar />
      <Main />
      <div className="absolute top-200 w-full bg-blue-100 py-6 text-center text-gray-700">
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
