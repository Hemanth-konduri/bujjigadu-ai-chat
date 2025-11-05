import express from "express";

const app = express();
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);


app.listen(3000, () => {
  console.log("Server is running on port "+ PORT);
});