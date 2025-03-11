import React, { useState } from "react";
import Navbar from "../FrontPage/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddStock } from "../../Redux/Features/StocksCart";
import { login,logout } from "../../Redux/Features/AuthSlice";
import axios from "axios";
const Calculator = () => {
  const [activeCalculator, setActiveCalculator] = useState("SIP");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
      const fetchUserData = async () => {
        try {
          // Get token from cookies
          const cookieToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
    
          if (cookieToken) {
            const response = await axios.get(
              'http://localhost:3000/api/user/profiledata', 
              {
                headers: {
                  Authorization: `Bearer ${cookieToken}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            console.log(response.data.data,"frontpage");
            // Ensure response structure matches Redux expectations
            const userData = {
              Name: response.data.data.Name || '',
              EmailID: response.data.data.EmailID || '',
              PhoneNo: response.data.data.PhoneNo || '0',
              Stocks: response.data.data.Stocks || [],
              TotalAmount: response.data.data.TotalAmount || 0,
              WalletAmount: response.data.data.WalletAmount || 0,
              isVerified: response.data.data.isVerified || false,
              // Calculated fields (initialize if not provided)
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
          // Clear invalid credentials
          dispatch(logout());
          // Optionally redirect to login
          // navigate('/login');
        }
      };
    
      fetchUserData();
    }, [dispatch]);
  return (
    <div className="">
      <Navbar display="sticky"/>
      <div className=" flex flex-col items-center min-h-screen bg-gray-50 p-4 pt-8">
        {" "}
        {/* Added pt-8 for top padding */}
        <div className="w-full max-w-2xl mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg text-black font-semibold mb-4">
              Popular Calculators
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {" "}
              {/* Added overflow for mobile */}
              {["SIP", "FD", "LumpSum", "GST", "EMI"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveCalculator(type)}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm ${
                    activeCalculator === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator components render here */}
          {activeCalculator === "SIP" && <SIPCalculator />}
          {activeCalculator === "FD" && <FDCalculator />}
          {activeCalculator === "LumpSum" && <LumpSumCalculator />}
          {activeCalculator === "GST" && <GSTCalculator />}
          {activeCalculator === "EMI" && <EMICalculator />}
        </div>
      </div>
    </div>
  );
};

// Fixed Deposit Calculator
const FDCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(5);
  const [compounding, setCompounding] = useState("Monthly");

  const calculateFD = () => {
    const rate = interestRate / 100;
    let n = 1;
    if (compounding === "Monthly") n = 12;
    if (compounding === "Quarterly") n = 4;
    if (compounding === "Half-Yearly") n = 2;

    const amount = principal * Math.pow(1 + rate / n, n * tenure);
    return amount;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">FD Calculator</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Deposit Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3">₹</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Interest Rate (% p.a.)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full pr-8 px-4 py-3 border rounded-lg"
              />
              <span className="absolute right-3 top-3">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tenure (years)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Compounding Frequency
            </label>
            <select
              value={compounding}
              onChange={(e) => setCompounding(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            >
              {["Monthly", "Quarterly", "Half-Yearly", "Yearly"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Maturity Value:</span>
            <span className="text-2xl font-bold text-blue-700">
              {formatCurrency(calculateFD())}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Principal: {formatCurrency(principal)} | Interest:{" "}
            {formatCurrency(calculateFD() - principal)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Lump Sum Calculator
const LumpSumCalculator = () => {
  const [investment, setInvestment] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const calculateLumpSum = () => {
    return investment * Math.pow(1 + returnRate / 100, years);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Lump Sum Calculator</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Investment Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3">₹</span>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Expected Return (% p.a.)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full pr-8 px-4 py-3 border rounded-lg"
              />
              <span className="absolute right-3 top-3">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Investment Period (years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Future Value:</span>
            <span className="text-2xl font-bold text-blue-700">
              {formatCurrency(calculateLumpSum())}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Invested: {formatCurrency(investment)} | Returns:{" "}
            {formatCurrency(calculateLumpSum() - investment)}
          </div>
        </div>
      </div>
    </div>
  );
};

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUpPercentage, setStepUpPercentage] = useState(10);
  const [showStepUp, setShowStepUp] = useState(false);

  const calculateSIP = () => {
    const monthlyRate = annualReturn / 100 / 12;
    const months = years * 12;
    const futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    return futureValue;
  };

  const calculateStepUpSIP = () => {
    let currentInvestment = monthlyInvestment;
    let totalValue = 0;
    const monthlyRate = annualReturn / 100 / 12;

    for (let year = 1; year <= years; year++) {
      const monthsRemaining = (years - year + 1) * 12;
      const yearFV =
        currentInvestment *
        ((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate) *
        (1 + monthlyRate);
      totalValue += yearFV;
      currentInvestment *= 1 + stepUpPercentage / 100;
    }

    return totalValue;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const regularSIP = calculateSIP();
  const stepUpSIP = calculateStepUpSIP();
  const totalInvested = showStepUp
    ? (monthlyInvestment *
        12 *
        (Math.pow(1 + stepUpPercentage / 100, years) - 1)) /
      (stepUpPercentage / 100)
    : monthlyInvestment * years * 12;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            SIP Investment Calculator
          </h1>
          <p className="mt-2 text-gray-700">
            Calculate your potential returns with regular & step-up SIP
          </p>
        </div>

        {/* Calculator Body */}
        <div className="space-y-8">
          {/* Input Section */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-6">
            {/* Mode Selector */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowStepUp(false)}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  !showStepUp
                    ? "bg-blue-700 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Regular SIP
              </button>
              <button
                onClick={() => setShowStepUp(true)}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  showStepUp
                    ? "bg-blue-700 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Step-Up SIP
              </button>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Monthly Investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-gray-700">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) =>
                        setMonthlyInvestment(parseFloat(e.target.value))
                      }
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Investment Period (years)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                    <span className="absolute right-3 top-3.5 text-gray-700">
                      Years
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Expected Returns
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={annualReturn}
                      onChange={(e) =>
                        setAnnualReturn(parseFloat(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                    <span className="absolute right-3 top-3.5 text-gray-700">
                      %
                    </span>
                  </div>
                </div>

                {showStepUp && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Annual Step-Up
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={stepUpPercentage}
                        onChange={(e) =>
                          setStepUpPercentage(parseFloat(e.target.value))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                      <span className="absolute right-3 top-3.5 text-gray-700">
                        %
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-50 rounded-xl p-6 space-y-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {showStepUp ? "Step-Up SIP Projection" : "Regular SIP Projection"}
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <div>
                  <span className="text-gray-800">Total Invested</span>
                  <p className="text-xs text-gray-600 mt-1">Principal amount</p>
                </div>
                <span className="font-medium text-gray-900">
                  {formatCurrency(totalInvested)}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <div>
                  <span className="text-gray-800">Estimated Returns</span>
                  <p className="text-xs text-gray-600 mt-1">Wealth gained</p>
                </div>
                <span className="font-medium text-green-700">
                  +
                  {formatCurrency(
                    showStepUp
                      ? stepUpSIP - totalInvested
                      : regularSIP - totalInvested
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-gray-800 font-semibold">
                    Total Value
                  </span>
                  <p className="text-xs text-gray-600 mt-1">Maturity amount</p>
                </div>
                <span className="text-2xl font-bold text-blue-700">
                  {formatCurrency(showStepUp ? stepUpSIP : regularSIP)}
                </span>
              </div>
            </div>

            {showStepUp && (
              <div className="mt-4 text-sm text-blue-900 bg-blue-100 p-3 rounded-lg">
                <span className="font-medium">Note:</span> Your monthly
                investment increases by {stepUpPercentage}% annually
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GSTCalculator = () => {
  const [amount, setAmount] = useState(1000);
  const [gstRate, setGstRate] = useState(18);
  const [isAddMode, setIsAddMode] = useState(true);

  const calculateGST = () => {
    if (isAddMode) {
      const gstAmount = amount * (gstRate / 100);
      return { original: amount, gst: gstAmount, total: amount + gstAmount };
    }
    const original = amount / (1 + gstRate / 100);
    return { original: original, gst: amount - original, total: amount };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">GST Calculator</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              {isAddMode ? "Original Amount" : "Total Amount"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GST Rate</label>
            <div className="relative">
              <input
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full pr-8 px-4 py-3 border rounded-lg"
              />
              <span className="absolute right-3 top-3">%</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAddMode(!isAddMode)}
          className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          {isAddMode ? "Add GST" : "Remove GST"}
        </button>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">GST Amount:</span>
              <span className="text-lg font-bold text-blue-700">
                {formatCurrency(calculateGST().gst)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {isAddMode ? "Total Amount" : "Original Amount"}:
              </span>
              <span className="text-lg font-bold text-blue-700">
                {formatCurrency(
                  isAddMode ? calculateGST().total : calculateGST().original
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [years, setYears] = useState(5);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = years * 12;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return isNaN(emi) ? 0 : emi;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatEMI = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const totalPayment = calculateEMI() * years * 12;
  const totalInterest = totalPayment - principal;

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">EMI Calculator</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3">₹</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Annual Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full pr-8 px-4 py-3 border rounded-lg"
              />
              <span className="absolute right-3 top-3">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Loan Tenure (years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Monthly EMI:</span>
              <span className="text-lg font-bold text-blue-700">
                {formatEMI(calculateEMI())}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Payment:</span>
              <span className="text-lg font-bold text-blue-700">
                {formatCurrency(totalPayment)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Interest:</span>
              <span className="text-lg font-bold text-blue-700">
                {formatCurrency(totalInterest)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
