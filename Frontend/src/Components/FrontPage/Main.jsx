import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Features/AuthSlice.js";
import socketIO from "socket.io-client";
import { set } from "mongoose";
const socket = socketIO.connect("http://localhost:8080");
const Main = () => {
  const [modals, setModals] = useState({
    auth: false,
    otp: false,
    chat: false,
  });
  const [isOTP, setIsOTP] = useState(false);

  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Auth);
  const handleModal = (modalName, isOpen) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: isOpen,
      ...(modalName === "auth" && !isOpen && { otp: false }),
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-xl -top-48 -left-48 animate-pulse" />
          <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-xl -bottom-48 -right-48 animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl font-light text-emerald-400">
              Empowering Your Trades, Simplifying Your Success
            </p>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Built for Growing India
            </h1>
          </div>

          <button
            onClick={() => {
              if (!state.isLogged) handleModal("auth", true);
              else navigate("/dashboard");
            }}
            className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </div>

      {modals.auth && (
        <Modal
          userData={userData}
          setUserData={setUserData}
          close={() => handleModal("auth", false)}
          showOTP={() => {
            handleModal("auth", false);
            handleModal("otp", true);
          }}
          setOTP={setOtp}
          setIsOTPModal={() => {
            handleModal("auth", false);
            setIsOTP(true);
          }}
        />
      )}

      {isOTP && (
        <OTP
          userData={userData}
          otp={otp}
          close={() => setIsOTP(false)}
          setOTP={setOtp}
        />
      )}

      {modals.chat && (
        <ChatBot
          close={() => handleModal("chat", false)}
          setModalState={(state) => handleModal("chat", state)}
        />
      )}
    </>
  );
};

const Modal = ({
  userData,
  setUserData,
  setIsOTPModal,
  close,
  setOTP,
  showOTP,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const GenerateOTP = () => {
    let otpValue = "";
    for (let i = 0; i < 6; i++) {
      otpValue += Math.floor(Math.random() * 10);
    }
    setOTP(otpValue);
  };

  const dispatch = useDispatch();
  const Login = async () => {
    try {
      console.log("senttttttttttttttttttttt");
      const res = await axios.post(
        `http://localhost:8080/api/user/login `,
        userData
      );

      if (res.status === 200) {
        document.cookie = `token=${res.data.token}`;
        dispatch(login({ user: userData, token: res.data.token }));
        navigate("/dashboard");
        close();
      }
      console.log("login res", res);
    } catch (error) {
      console.log("error in login", error);
    }
  };
  const handleAuth = () => {
    console.log("handleAuth", userData);
    // e.preventDefault();
    GenerateOTP();
    showOTP();
  };

  const verifyUser = async () => {
    try {
      console.log(import.meta.env.BACKEND_API);
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API || "http://localhost:8080"
        }/api/user/verifyuser?email=${userData.email}`
      );
      console.log("res", res);
      if (res.status === 202) {
        setIsOTPModal();
        handleAuth();
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      console.log("error in verify user", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md flex shadow-xl border border-gray-300 mx-4">
        <div className="flex-1 p-8">
          <div className="flex justify-end">
            <button
              onClick={close}
              className="text-gray-700 hover:text-gray-900 transition-colors text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-emerald-400 mb-4">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-700">
              {isLogin ? "Login to continue" : "Start your investment journey"}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-2 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2 text-left">
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              onClick={() => {
                if (!isLogin) {
                  verifyUser();
                } else {
                  Login();
                }
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-lg font-semibold text-white transition-colors"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            <div className="text-center text-gray-700 mt-4">
              {isLogin ? "New to us? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  console.log("njacksadlkcj");
                  setIsLogin(!isLogin);
                }}
                className="text-emerald-400 hover:text-emerald-500 font-medium underline"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OTP = ({ userData, otp, close, setOTP }) => {
  const [timer, setTimer] = useState(30);
  const [otpValue, setOtpValue] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const sendOTP = async () => {
    try {
      console.log(otp);
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API || "http://localhost:8080"
        }/api/user/OTPVerify`,
        {
          email: userData.email,
          OTP: otp,
        }
      );
      console.log("res is OTPVerify, ", res);
    } catch (error) {
      console.log("OTP Error:", error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    sendOTP();
  }, []);

  const dispatch = useDispatch();
  const registerUser = async () => {
    try {
      console.log("in register");
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API || "http://localhost:8080"
        }/api/user/register`,
        userData
      );
      console.log(res.data, "res");
      if (res.status === 200) {
        const userData = {
          Name: res.data.user.Name || "",
          EmailID: res.data.user.EmailID || "",
          PhoneNo: res.data.user.PhoneNo || "0",
          Stocks: res.data.user.Stocks || [],
          TotalAmount: res.data.user.TotalAmount || 0,
          WalletAmount: res.data.user.WalletAmount || 0,
          isVerified: res.data.user.isVerified || false,
          // Calculated fields (initialize if not provided)
          netProfit: res.data.user.netProfit || 0,
          annualReturn: res.data.user.annualReturn || 0,
        };
        document.cookie = `token=${res.data.token}`;
        dispatch(login({ user: userData, token: res.data.token }));
        navigate("/dashboard");
        close();
      }
    } catch (error) {
      navigate("/");
      console.error(
        "Registration Error:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpValue];
    newOtp[index] = value;
    setOtpValue(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = () => {
    console.log("otpValue", otpValue.join(""), otp);
    if (otpValue.join("") === otp) {
      console.log("register called");
      registerUser();
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-end">
          <button
            onClick={close}
            className="text-black hover:text-gray-900 transition-colors text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-emerald-400 mb-4">
            Verify OTP
          </h1>
          <p className="text-gray-700">
            We've sent a 6-digit code to {userData.email}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-3 text-black">
            {otpValue.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-2xl text-center bg-gray-100 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={verifyOTP}
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-lg font-semibold text-white transition-colors"
          >
            Verify OTP
          </button>

          <div className="text-center text-gray-700">
            {timer > 0 ? (
              `Resend OTP in ${timer}s`
            ) : (
              <button
                onClick={() => {
                  setTimer(30);

                  let otpValue = "";
                  for (let i = 0; i < 6; i++) {
                    otpValue += Math.floor(Math.random() * 10);
                  }
                  setOTP(otpValue);
                  sendOTP();
                }}
                className="text-emerald-400 hover:text-emerald-500 underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Change to your backend URL

const ChatBot = ({ close, setModalState }) => {
  const [aiMessage, setaimessage] = useState([]); 
  const [normalmessage, setnormalMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatMode, setChatMode] = useState('AI');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on('message', (msg) => {
      // setnormalMessage(prev => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      // Add user message immediately
      const userMessage = {
        text: inputMessage,
        isUser: true,
        id: Date.now().toString(),
      };

      if (chatMode === 'AI') {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8080/service/chatai?prompt=${encodeURIComponent(inputMessage)}`
        );

        const responseText = typeof response.data === 'string' 
          ? response.data 
          : response.data?.response || response.data?.data || JSON.stringify(response.data);

        const aiResponse = {
          text: responseText,
          isUser: false,
          id: `ai-${Date.now()}`,
        };

        setaimessage(prev => [...prev, userMessage, aiResponse]);
      } else {
        const normalMessage = {
          text: inputMessage,
          name: "onkar",
          id: `${socket.id}-${Date.now()}`,
          socketID: socket.id,
          isUser: false,
        };

        socket.emit('message', normalMessage);
        setnormalMessage(prev => [...prev, userMessage, normalMessage]);
      }

      setInputMessage('');
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        text: 'Failed to get response',
        isUser: false,
        id: `error-${Date.now()}`,
      };

      if (chatMode === 'AI') {
        setaimessage(prev => [...prev, errorMessage]);
      } else {
        setnormalMessage(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md h-[70vh] flex flex-col shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-bold text-gray-800">Trading Assistant</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setChatMode('AI')}
              className={`px-3 py-1 rounded-lg transition-all ${
                chatMode === 'AI'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              AI
            </button>
            <button
              onClick={() => setChatMode('Normal')}
              className={`px-3 py-1 rounded-lg transition-all ${
                chatMode === 'Normal'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Normal
            </button>
          </div>

          <button
            onClick={() => {
              close();
              setModalState(false);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
          {(chatMode === 'AI' ? aiMessage : normalmessage).map((msg) => (
            <div
            key={msg.id}
            className={`p-3.5 rounded-2xl max-w-[85%] shadow-sm ${
              msg.isUser
                ? 'bg-emerald-500/10 ml-auto text-emerald-600 border border-emerald-500/20'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            {msg.text}
            {isLoading && msg.id === (chatMode === 'AI' ? aiMessage : normalmessage)[(chatMode === 'AI' ? aiMessage : normalmessage).length - 1]?.id && (
              <div className="inline-block ml-2 animate-pulse">...</div>
            )}
          </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-gray-200 bg-white">
          <div className="relative">
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="w-full pl-5 pr-12 py-3.5 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-50"
              placeholder={chatMode === 'AI' ? 'Ask me anything...' : 'Type your message...'}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Main;
export { Modal, ChatBot, OTP };
