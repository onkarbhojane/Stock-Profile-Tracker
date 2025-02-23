import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { ChatBot, Modal } from "./Main";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ hide = true, chat = true, setModalState }) => {
  const [searchModal, setSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState([1, 2, 3, 34]);
  const [search, setSearch] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isModalchat, setIsModalChat] = useState(false);
  const [stockData, setStockData] = useState([""]);
  const [isOTP, setIsOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [Data, setData] = useState(["", "", ""]);
  const userState = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        // console.log(isLogged.IsLogged, " user is logged");
        console.log("searched !!!!!!");
        setStockData([1, 2, 3, 4, 5]);
        if (res) {
          setStockData([...res.data]);
          console.log("search result are ", res.data);
        }
      } catch (error) {
        console.log("error in searching product ", error);
      }
    })();
  }, [search]);
  const toggleSearchModal = () => {
    console.log("done")
    setSearchModal((prev) =>{
      if(prev){
        setModalState('hidden')
      }else setModalState("fixed")
    });
  };
  useEffect(() => {
    console.log("otp value is ", otp);
  }, [otp]);
  return (
    <div className="Nav">
      <h1 className="font-bold">StockTrack Pro</h1>
      <div
        className="search-container"
        onFocus={() => {
          setSearchModal(true);
        }}
        onBlur={() => setSearchModal(false)}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      >
        <button
          className="search-button"
          onClick={() => {
            setModalState((prev) => {
              console.log(prev, "prev");
              return "hidden";
            });
          }}
        >
          ⌕
        </button>
        <input
          className="search-input"
          type="text"
          value={search}
          placeholder="What are you looking for?"
        />
        {searchModal && (
          <button
            className="search-button"
            onClick={() => {
              setSearch("");
              setModalState("fixed");
            }}
            style={{
              color: "gray",
              fontSize: "15px",
            }}
          >
            X
          </button>
        )}
      </div>
      <div className="outBut mr-10">
        {userState.IsLogged ? (
          <h1>hello</h1>
        ) : (
          hide && (
            <button
              className="but"
              onClick={() => {
                setIsModal((prev) => !prev);
                // setModalState('');
              }}
            >
              Login/Register
            </button>
          )
        )}
        {chat && (
          <button
            className="but"
            onClick={() => {
              setIsModalChat((prev) => !prev);
              setModalState("hidden");
            }}
          >
            Lets Chat
          </button>
        )}
        <a href="#" className="about">
          About
        </a>
      </div>

      {searchModal && (
        <Modal1
          setModalState={setModalState}
          data={searchResults}
          res={stockData}
          close={toggleSearchModal}
        />
      )}
      {isModal && (
        <Modal
          Data={Data}
          setData={setData}
          isOTP={isOTP}
          otp={setIsOTP}
          setOTP={setOtp}
          close={setIsModal}
        />
      )}
      {isOTP && <OTP Data={Data} otp={otp} />}
      {isModalchat && (
        <ChatBot setModalState={setModalState} close={setIsModalChat} />
      )}
    </div>
  );
};

const OTP = ({ Data, otp, close }) => {
  const [timer, setTimer] = useState(30);
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [verified1, setVerified1] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]); // Store refs for each input field

  const sendOTP = async () => {
    console.log("OTP sending to ", Data[1]);
    try {
      await axios.post("http://localhost:3000/api/user/OTPVerify", {
        email: Data[1],
        OTP: otp,
      });
    } catch (error) {
      console.log("Error in sending OTP:", error);
    }
  };

  const Register = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        name: Data[0],
        email: Data[1],
        password: Data[2],
      });
      console.log("Response:", res);
      if (res.status === 200) {
        console.log("User registered successfully");
        navigate("/user/createaccount");
      }
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  useEffect(() => {
    sendOTP();
  }, [otp]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only digits (0-9)

    const newOtp = [...otpValue];
    newOtp[index] = value;
    setOtpValue(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to previous input
    }
  };

  return (
    <div
      className="Modal fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      onClick={() => close(false)}
    >
      <div
        className="w-[300px] md:w-[400px] p-6 bg-white rounded-lg shadow-lg flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing on click inside modal
      >
        <h1 className="font-bold text-lg">Verify OTP</h1>

        {/* OTP Inputs */}
        <div className="flex gap-2">
          {otpValue.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)} // Assign ref
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-10 text-center border rounded-sm text-lg"
            />
          ))}
        </div>

        {/* OTP Verification Message */}
        {verified1 && (
          <div className="text-red-500 font-medium">OTP not matched!</div>
        )}
        {verified && (
          <div className="text-green-500 font-medium">
            OTP verified successfully!
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={() => {
            console.log("Entered OTP:", otpValue.join(""));
            if (otp === otpValue.join("")) {
              setVerified(true);
              setVerified1(false);
              Register();
            } else {
              setVerified1(true);
              setVerified(false);
              setTimer(0);
            }
          }}
          className="bg-green-400 w-40 rounded-3xl font-bold text-xl text-white h-10 
                     hover:bg-green-500 active:bg-green-600 focus:outline-none"
        >
          Verify
        </button>

        {/* Resend OTP or Timer */}
        {timer === 0 ? (
          <div
            onClick={() => {
              setTimer(30);
              setVerified1(false);
              setOtpValue(["", "", "", "", "", ""]); // Clear OTP input on resend
              sendOTP();
            }}
            className="text-blue-500 cursor-pointer"
          >
            Didn't receive OTP? <span className="underline">Resend</span>
          </div>
        ) : (
          <div className="text-gray-600 text-sm text-center">
            OTP sent successfully <br />
            Time Remaining: {timer} seconds
          </div>
        )}
      </div>
    </div>
  );
};

const Modal1 = ({ res, close, setModalState }) => {

  return (
    <div
      className="modal show"
      onClick={() => {
        console.log("it is closed")
        close();
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-items">
          {res.map((item, index) => {
            return (
              <div key={index} className="modal-item">
                <a href="#">{`Result ${index + 1}: ${item}`}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
