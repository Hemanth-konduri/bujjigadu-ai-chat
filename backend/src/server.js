import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import { ENV } from "./lib/env.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

const app = express();


const PORT = ENV.PORT || 3000;
app.use(express.json());  // req.body
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}));
app.use(cookieParser())
 
const __dirname = path.resolve();

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res)=>{
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    })
}else{
    app.get("/", (req, res)=>{
        res.send("API is running...");
    })
}

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port "+ PORT);
  connectDb();
});