import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaperTrading = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(100000); // Starting balance
  const [positions, setPositions] = useState([]);
  const [newTrade, setNewTrade] = useState({
    symbol: "",
    quantity: "",
    action: "buy", // buy or sell
  });

  const handleExecuteTrade = (e) => {
    e.preventDefault();
    if (newTrade.symbol && newTrade.quantity) {
      const trade = {
        ...newTrade,
        id: Date.now(),
        price: Math.random() * 100 + 50, // Simulated price
        timestamp: new Date().toLocaleString(),
      };
      setPositions([...positions, trade]);
      setNewTrade({ symbol: "", quantity: "", action: "buy" });
    }
  };

  const handleClosePosition = (id) => {
    setPositions(positions.filter((position) => position.id !== id));
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
            Paper Trading
          </h1>
          <p className="text-gray-600 text-xl">
            Practice trading with virtual money in real market conditions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Trading Controls */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6">
              Execute a Trade
            </h2>
            <form onSubmit={handleExecuteTrade} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Stock Symbol</label>
                  <input
                    type="text"
                    value={newTrade.symbol}
                    onChange={(e) =>
                      setNewTrade({ ...newTrade, symbol: e.target.value })
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
                    value={newTrade.quantity}
                    onChange={(e) =>
                      setNewTrade({ ...newTrade, quantity: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Action</label>
                  <select
                    value={newTrade.action}
                    onChange={(e) =>
                      setNewTrade({ ...newTrade, action: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Execute Trade
              </button>
            </form>
          </div>
        </section>

        {/* Portfolio Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
            Your Portfolio
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-emerald-600">
                Account Balance
              </h3>
              <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
            </div>
            {positions.length > 0 ? (
              <div className="space-y-6">
                {positions.map((position) => (
                  <div
                    key={position.id}
                    className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-600">
                        {position.symbol} ({position.action.toUpperCase()})
                      </h3>
                      <p className="text-gray-600">
                        Quantity: {position.quantity} | Price: $
                        {position.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {position.timestamp}
                      </p>
                    </div>
                    <button
                      onClick={() => handleClosePosition(position.id)}
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
                No open positions. Start trading to see your portfolio!
              </p>
            )}
          </div>
        </section>

        {/* Market Data Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
            Market Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                symbol: "AAPL",
                price: 145.09,
                change: "+1.23",
                percentChange: "+0.85%",
              },
              {
                symbol: "GOOGL",
                price: 2750.34,
                change: "-5.67",
                percentChange: "-0.21%",
              },
              {
                symbol: "TSLA",
                price: 850.25,
                change: "+12.45",
                percentChange: "+1.48%",
              },
            ].map((stock, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                  {stock.symbol}
                </h3>
                <p className="text-gray-600">Price: ${stock.price.toFixed(2)}</p>
                <p
                  className={`text-sm ${
                    stock.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stock.change} ({stock.percentChange})
                </p>
              </div>
            ))}
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
            Disclaimer: Paper trading involves no real money. StockTrack Pro does
            not provide investment advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PaperTrading;