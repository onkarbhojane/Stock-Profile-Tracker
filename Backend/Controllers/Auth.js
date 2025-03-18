import User from "../Models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config;
import { generateToken } from "../Middlewares/JWT.js";
import transporter from "../Mail/Mail.js";
const login = async (req, res) => {
  try {
    console.log("Login Request:", req.body);

    const data = await User.findOne({ EmailID: req.body.email });

    if (!data) {
      return res.status(401).json({ message: "User not found" });
    }

    const token = jwt.sign({ _id: data._id, email: data.EmailID }, "1234", {
      expiresIn: "1h",
    });

    console.log("Generated Token:", token);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// done 
const OTPVerify = (req, res) => {
  console.log("Register");
  console.log(req.body);
  const { email, OTP } = req.body;
  const mailOptions = {
    from: "onkar.bhojane22@gmail.com",
    to: email,
    subject: "OTP verification for Stock Market App",
    text: `Your OTP is ${OTP}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
  res.status(200).send("OTP sent successfully");
};

const verifyUser = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ EmailID: email });
    if (!user) {
      return res.status(202).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in backend" });
  }
};
const register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    const { name, email, password } = req.body;
    const data = User.findOne({ EmailID: email });
    console.log(data,"pppppppppppppppppp");
    if (data.EmailID===email) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new User({
      Name: name,
      EmailID: email,
      Password: hashedPassword,
      isVerified: true,
    });

    await newUser.save();
    const token = jwt.sign({ _id: newUser._id, email: email }, "1234", {
      expiresIn: "1h",
    });

    console.log("Generated Token:", token);
    res
      .status(200)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfileData = async (req, res) => {
  try {
    const payload = req.userPayload;
    console.log("payload is ", payload);
    const data = await User.findOne({
      EmailID: payload.email,
      _id: payload._id,
    });
    console.log("data is ", payload);
    if (!data) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { login, register, OTPVerify, getProfileData, verifyUser };
