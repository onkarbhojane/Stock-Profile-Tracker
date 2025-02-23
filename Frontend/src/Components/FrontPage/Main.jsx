import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const Main = () => {
  const [count1, setCount] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const count = useSelector((state) => state.Counter);
  const dispatch = useDispatch();
  return (
    <div className="Main">
      <p className="p1">Empowering Your Trades, Simplifying Your Success</p>
      <h1 className="p1">Built for Growing India</h1>
      <button onClick={() => setIsModal(true)}>Get Started</button>
      {isModal && <Modal close={setIsModal} />}
    </div>
  );
};
const Modal = ({ Data, setData, isOTP, setOTP, otp, close,setModalState }) => {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    console.log(typeof isOTP, typeof close);
  }); // Store password input

  const GenerateOTP = () => {
    let otp1 = "";
    for (let i = 0; i < 6; i++) {
      otp1 += Math.floor(Math.random() * 10);
    }
    setOTP(otp1);
  };

  const signUp = async () => {
    try {
      // Try to register the user
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST", // Send a POST request
        headers: { "Content-Type": "application/json" }, // Specify the data type
        body: JSON.stringify({ name, email, password }), // Send the user data
      });
      const data = await res.json(); // Get the response data
      console.log(data); // Log the response data
    } catch (error) {
      console.error(error); // Log any errors
    }
  };
  const handleModalClick = (event) => {
    event.stopPropagation(); // Prevent click from propagating to the parent
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email: Data[1],
        password: Data[2],
      });
      if (res.status === 200) {
        console.log(res, " Login Successfull");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="Modal flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50"
      onClick={() => {
        close(false)
      }}
    >
      <div className="Modal-content gap-5" onClick={handleModalClick}>
        <div className="image">
          <h1
            style={{
              width: "30vh",
              color: "white",
              margin: "8vh",
              fontFamily: "cursive",
            }}
          >
            Simple Free, Investing.
          </h1>
        </div>
        <div>
          <button className="close-button" onClick={() => close(false)}>
            &times;
          </button>
          {isLogin ? (
            <div
              style={{
                paddingTop: "70px",
                fontFamily: "cursive",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                gap: "15px",
              }}
            >
              <h2>Login</h2>
              <input
                type="email"
                onChange={(e) => {
                  const newData = [...Data];
                  newData[1] = e.target.value;
                  setData(newData);
                }}
                placeholder="Email"
                required
              />
              <input
                type="password"
                onChange={(e) => {
                  const newData = [...Data];
                  newData[2] = e.target.value;
                  setData(newData);
                }}
                placeholder="Password"
                required
              />
              <button
                type="submit"
                style={{
                  marginLeft: "20px",
                  paddingRight: "20px",
                }}
                onClick={() => login()}
              >
                Login
              </button>
              <p>
                Don't have an account?{" "}
                <button
                  className="toggle"
                  onClick={() => {
                    setIsLogin(false);
                  }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          ) : (
            <div
              style={{
                paddingTop: "5vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "space-evenly",
                gap: "15px",
                fontFamily: "cursive",
              }}
            >
              <h2>Sign Up</h2>
              <input
                type="text"
                onChange={(e) => {
                  const newData = [...Data];
                  newData[0] = e.target.value;
                  setData(newData);
                }}
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                onChange={(e) => {
                  const newData = [...Data];
                  newData[1] = e.target.value;
                  setData(newData);
                }}
                placeholder="Email"
                required
              />
              <input
                type="password"
                onChange={(e) => {
                  const newData = [...Data];
                  newData[2] = e.target.value;
                  setData(newData);
                }}
                placeholder="Password"
                required
              />
              <button
                onClick={() => {
                  close(false);
                  GenerateOTP();
                  if (typeof otp === "function") {
                    otp(true);
                  } else {
                    console.error("otp is not a function:", otp);
                  }
                }}
                style={{
                  marginLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                Register
              </button>

              <p>
                Already have an account?{" "}
                <button className="toggle" onClick={() => setIsLogin(true)}>
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const ChatBot = ({ close, setModalState }) => {
  const [mes, setMes] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setMes((prevMes) => [...prevMes, e.target.value]); // Ensure proper state update
      e.target.value = ""; // Clear input after Enter
    }
  };

  return (
    <div className="Modal flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50">
      <div className="h-150 w-200 bg-blue-200 rounded-2xl p-4 flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={() => {
            close(false);
            setModalState((prev) => {
              console.log(prev, "prev");
              return "fixed";
            });
          }}
          className="self-end bg-white text-gray-700 rounded-full p-2 shadow-md"
        >
          ✕
        </button>

        {/* Chat Messages */}
        <div className="flex flex-col space-y-2 overflow-y-auto h-[250px] p-2">
          {mes.map((data, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md w-fit max-w-[80%]"
            >
              {data}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="bg-blue-100 flex items-center rounded-md p-2">
          <input
            onKeyDown={handleKeyDown}
            className="h-10 w-full rounded-md bg-white px-4 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your Query"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
export { Modal, ChatBot };
