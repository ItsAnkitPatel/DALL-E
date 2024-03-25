import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import Post from "../mongodb/models/post.js";
dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", (req, res) => {
  res.send("Hello from Dalle");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(`Error in DallE Route : ${error}`);
    res.status(400).send(error);
  }
});
export default router;
