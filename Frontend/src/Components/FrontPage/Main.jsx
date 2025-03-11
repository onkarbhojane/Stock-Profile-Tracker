// import React, { useEffect, useState } from "react";
// import "./Main.css";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import "./Navbar";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// const Main = () => {
//   const [count1, setCount] = useState(0);
//   const [isModal, setIsModal] = useState(false);
//   const count = useSelector((state) => state.Counter);
//     const [userData, setUserData] = useState({
//       name: "",
//       email: "",
//       password: "",
//     });
//   const dispatch = useDispatch();
//   return (
//     <div className="Main">
//       <p className="p1">Empowering Your Trades, Simplifying Your Success</p>
//       <h1 className="p1">Built for Growing India</h1>
//       <button onClick={() => setIsModal(true)}>Get Started</button>
//       {isModal && <Modal userData={userData} close={setIsModal} />}
//     </div>
//   );
// };
// const Modal = ({ userData, setUserData, setIsOTPModal, setOTP, close }) => {
//   const [isLogin, setIsLogin] = useState(true);

//   useEffect(() => {
//     console.log(typeof setIsOTPModal, typeof close);
//   }, []);

//   const GenerateOTP = () => {
//     let otpValue = "";
//     for (let i = 0; i < 6; i++) {
//       otpValue += Math.floor(Math.random() * 10);
//     }
//     setOTP(otpValue);
//   };

//   const signUp = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/user/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData), // ✅ Send as an object
//       });
//       const data = await res.json();
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const login = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/api/user/login", {
//         email: userData.email,
//         password: userData.password,
//       });
//       if (res.status === 200) {
//         console.log(res, "Login Successful");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleModalClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     <div
//       className="Modal flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50"
//       onClick={() => close(false)}
//     >
//       <div className="Modal-content gap-5" onClick={handleModalClick}>
//         <div className="image">
//           <h1
//             style={{
//               width: "30vh",
//               color: "white",
//               margin: "8vh",
//               fontFamily: "cursive",
//             }}
//           >
//             Simple Free, Investing.
//           </h1>
//         </div>
//         <div>
//           <button className="close-button" onClick={() => close(false)}>
//             &times;
//           </button>
//           {isLogin ? (
//             <div
//               style={{
//                 paddingTop: "70px",
//                 fontFamily: "cursive",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-evenly",
//                 gap: "15px",
//               }}
//             >
//               <h2>Login</h2>
//               <input
//                 type="email"
//                 value={userData.email || ""} // ✅ Ensure controlled component
//                 onChange={(e) =>
//                   setUserData({ ...userData, email: e.target.value })
//                 }
//                 placeholder="Email"
//                 required
//               />

//               <input
//                 type="password"
//                 value={userData.password || ""}
//                 onChange={(e) =>
//                   setUserData({ ...userData, password: e.target.value })
//                 }
//                 placeholder="Password"
//                 required
//               />

//               <button
//                 type="submit"
//                 style={{ marginLeft: "20px", paddingRight: "20px" }}
//                 onClick={login}
//               >
//                 Login
//               </button>
//               <p>
//                 Don't have an account?{" "}
//                 <button className="toggle" onClick={() => setIsLogin(false)}>
//                   Sign Up
//                 </button>
//               </p>
//             </div>
//           ) : (
//             <div
//               style={{
//                 paddingTop: "5vh",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "space-evenly",
//                 gap: "15px",
//                 fontFamily: "cursive",
//               }}
//             >
//               <h2>Sign Up</h2>
//               <input
//                 type="text"
//                 value={userData.name || ""}
//                 onChange={(e) =>
//                   setUserData({ ...userData, name: e.target.value })
//                 }
//                 placeholder="Full Name"
//                 required
//               />

//               <input
//                 type="email"
//                 value={userData.email || ""}
//                 onChange={(e) =>
//                   setUserData({ ...userData, email: e.target.value })
//                 }
//                 placeholder="Email"
//                 required
//               />

//               <input
//                 type="password"
//                 value={userData.password || ""}
//                 onChange={(e) =>
//                   setUserData({ ...userData, password: e.target.value })
//                 }
//                 placeholder="Password"
//                 required
//               />

//               <button
//                 onClick={() => {
//                   close(false);
//                   GenerateOTP();
//                   setIsOTPModal(true);
//                 }}
//                 style={{ marginLeft: "20px", paddingRight: "20px" }}
//               >
//                 Register
//               </button>

//               <p>
//                 Already have an account?{" "}
//                 <button className="toggle" onClick={() => setIsLogin(true)}>
//                   Login
//                 </button>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ChatBot = ({ close, setModalState }) => {
//   const [mes, setMes] = useState([]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && e.target.value.trim() !== "") {
//       setMes((prevMes) => [...prevMes, e.target.value]); // Ensure proper state update
//       e.target.value = ""; // Clear input after Enter
//     }
//   };

//   return (
//     <div className="Modal flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50">
//       <div className="h-150 w-200 bg-blue-200 rounded-2xl p-4 flex flex-col justify-between">
//         {/* Close Button */}
//         <button
//           onClick={() => {
//             close(false);
//             setModalState((prev) => {
//               console.log(prev, "prev");
//               return "fixed";
//             });
//           }}
//           className="self-end bg-white text-gray-700 rounded-full p-2 shadow-md"
//         >
//           ✕
//         </button>

//         {/* Chat Messages */}
//         <div className="flex flex-col space-y-2 overflow-y-auto h-[250px] p-2">
//           {mes.map((data, index) => (
//             <div
//               key={index}
//               className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md w-fit max-w-[80%]"
//             >
//               {data}
//             </div>
//           ))}
//         </div>

//         {/* Input Field */}
//         <div className="bg-blue-100 flex items-center rounded-md p-2">
//           <input
//             onKeyDown={handleKeyDown}
//             className="h-10 w-full rounded-md bg-white px-4 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your Query"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const OTP = ({ userData, otp, close }) => {
//   const [timer, setTimer] = useState(30);
//   const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   const inputRefs = useRef([]);

//   // Function to send OTP
//   const sendOTP = async () => {
//     console.log("Sending OTP to:", userData.email);
//     try {
//       await axios.post("http://localhost:3000/api/user/OTPVerify", {
//         email: userData.email,
//         OTP: otp,
//       });
//     } catch (error) {
//       console.log("Error in sending OTP:", error);
//     }
//   };

//   // Function to register user
//   const registerUser = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/api/user/register", {
//         name: userData.name,
//         email: userData.email,
//         password: userData.password,
//       });

//       if (res.status === 200) {
//         console.log("User registered successfully!");
//         navigate("/user/createaccount");
//       }
//     } catch (error) {
//       console.log("Registration error:", error);
//     }
//   };

//   // Auto-send OTP when component mounts
//   useEffect(() => {
//     sendOTP();
//   }, []);

//   // Countdown timer
//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   // Handle OTP input change
//   const handleOtpChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return; // Allow only digits

//     const newOtp = [...otpValue];
//     newOtp[index] = value;
//     setOtpValue(newOtp);

//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus(); // Move to next input
//     }
//   };

//   // Handle backspace navigation
//   const handleKeyDown = (index, event) => {
//     if (event.key === "Backspace" && !otpValue[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   // Verify OTP
//   const verifyOTP = () => {
//     const enteredOtp = otpValue.join("");
//     if (enteredOtp === otp) {
//       setErrorMessage("");
//       registerUser();
//     } else {
//       setErrorMessage("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-transparent flex justify-center items-center"
//       onClick={() => close(false)}
//     >
//       <div
//         className="w-[300px] md:w-[400px] p-6 bg-white rounded-lg shadow-xl flex flex-col items-center gap-4"
//         onClick={(e) => e.stopPropagation()} // Prevent modal from closing on click inside
//       >
//         <h1 className="font-bold text-lg">Verify OTP</h1>

//         {/* OTP Inputs */}
//         <div className="flex gap-2">
//           {otpValue.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={digit}
//               ref={(el) => (inputRefs.current[index] = el)}
//               onChange={(e) => handleOtpChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               className="w-10 h-10 text-center border rounded-md text-lg focus:ring-2 focus:ring-blue-500"
//               autoFocus={index === 0} // Auto-focus first input
//             />
//           ))}
//         </div>

//         {/* Error Message */}
//         {errorMessage && <div className="text-red-500 font-medium">{errorMessage}</div>}

//         {/* Verify Button */}
//         <button
//           onClick={verifyOTP}
//           className="bg-green-500 w-40 rounded-md font-bold text-lg text-white h-10
//                      hover:bg-green-600 active:bg-green-700 focus:outline-none"
//         >
//           Verify
//         </button>

//         {/* Resend OTP or Timer */}
//         {timer === 0 ? (
//           <div
//             onClick={() => {
//               setTimer(30);
//               setOtpValue(["", "", "", "", "", ""]); // Clear OTP input
//               sendOTP();
//               setErrorMessage(""); // Reset error message
//             }}
//             className="text-blue-500 cursor-pointer"
//           >
//             Didn't receive OTP? <span className="underline">Resend</span>
//           </div>
//         ) : (
//           <div className="text-gray-600 text-sm text-center">
//             OTP sent successfully <br />
//             Time Remaining: {timer}s
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Main;
// export { Modal, ChatBot, OTP };
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Features/AuthSlice.js";
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
        "http://localhost:3000/api/user/login",
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
                  setIsOTPModal();
                  handleAuth();
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
      const res = await axios.post("http://localhost:3000/api/user/OTPVerify", {
        email: userData.email,
        OTP: otp,
      });
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
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
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

const ChatBot = ({ close, setModalState }) => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const [chat, setChat] = useState("AI");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setMessages([...messages, { text: e.target.value, isUser: true }]);
      e.target.value = "";
    }
  };

  return (
    <div className="fixed inset-0 round bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md h-[70vh] flex flex-col shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Trading Assistant</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setChat("AI")}
              className={`px-3 py-1 rounded-lg transition-all ${
                chat === "AI" 
                ? "bg-emerald-500 text-white shadow-sm" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              AI
            </button>
            <button
              onClick={() => setChat("Normal")}
              className={`px-3 py-1 rounded-lg transition-all ${
                chat === "Normal" 
                ? "bg-emerald-500 text-white shadow-sm" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3.5 rounded-2xl max-w-[85%] shadow-sm ${
                msg.isUser
                  ? "bg-emerald-500/10 ml-auto text-emerald-600 border border-emerald-500/20"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-gray-200 bg-white">
          <div className="relative">
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              className="w-full pl-5 pr-12 py-3.5 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              placeholder={chat === "AI" ? "Ask me anything..." : "Type your message..."}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
