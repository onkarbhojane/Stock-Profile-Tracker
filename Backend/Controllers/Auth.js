import user from "../Models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config;
import { generateToken } from "../Middlewares/JWT.js";
import transporter from "../Mail/Mail.js";
const login = async (req, res) => {
  try {
    console.log("Login Request:", req.body);

    // Check if user exists
    const data = await user.findOne({ EmailID: req.body.email });
    
    if (!data) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare passwords securely using bcrypt
    const isPasswordValid = await bcrypt.compare(req.body.password, data.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: data.EmailID }, "your_secret_key", { expiresIn: "1h" });

    console.log("Generated Token:", token);
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
  res.send("OTP sent successfully");
};

const register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    const { name, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new user({
      Name: name,
      EmailID: email,
      Password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { login, register, OTPVerify };
