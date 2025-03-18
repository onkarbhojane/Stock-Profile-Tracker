import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const chatAi = async (req, res) => {
  try {
    const { prompt } = req.query;

    const genAI = new GoogleGenerativeAI("AIzaSyCA9voRLanO-O-M-DteWkVhY06cslGJ45M");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log(result.response.candidates[0].content.parts[0].text);

    res.status(200).json({ data:result.response.candidates[0].content.parts[0].text});
  } catch (error) {
    console.error("Error in chatAi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default chatAi;
