import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ symbol: "", quantity: "" });

  const handleAddStock = (e) => {
    e.preventDefault();
    if (newStock.symbol && newStock.quantity) {
      setStocks([...stocks, { ...newStock, id: Date.now() }]);
      setNewStock({ symbol: "", quantity: "" });
    }
  };

  const handleRemoveStock = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

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
            Portfolio Builder
          </h1>
          <p className="text-gray-600 text-xl">
            Create and manage your investment portfolio with ease
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Portfolio Input Section */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6">
              Add Stocks to Your Portfolio
            </h2>
            <form onSubmit={handleAddStock} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Stock Symbol</label>
                  <input
                    type="text"
                    value={newStock.symbol}
                    onChange={(e) =>
                      setNewStock({ ...newStock, symbol: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., AAPL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newStock.quantity}
                    onChange={(e) =>
                      setNewStock({ ...newStock, quantity: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 10"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Add Stock
              </button>
            </form>
          </div>
        </section>

        {/* Portfolio Display Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
            Your Portfolio
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {stocks.length > 0 ? (
              <div className="space-y-6">
                {stocks.map((stock) => (
                  <div
                    key={stock.id}
                    className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-600">
                        {stock.symbol}
                      </h3>
                      <p className="text-gray-600">Quantity: {stock.quantity}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveStock(stock.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                Your portfolio is empty. Add stocks to get started!
              </p>
            )}
          </div>
        </section>

        {/* Portfolio Analysis Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
            Portfolio Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-emerald-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Total Value</h3>
              <p className="text-gray-600">$12,345.67</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-emerald-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Daily Change</h3>
              <p className="text-gray-600">+$123.45 (+1.23%)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-emerald-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Diversification</h3>
              <p className="text-gray-600">5 Sectors</p>
            </div>
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
            Disclaimer: StockTrack Pro does not provide investment advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioBuilder;