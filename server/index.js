import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => [
      console.log(`Application is running on http://localhost:8080`),
    ]);
  } catch (error) {
    console.log(err);
  }
};

startServer();
