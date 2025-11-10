import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import { ENV } from "./lib/env.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

const app = express();

console.log('Starting server...');
console.log('NODE_ENV:', ENV.NODE_ENV);
console.log('PORT:', ENV.PORT);

const PORT = ENV.PORT || 3000;
app.use(express.json());  // req.body
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}));
app.use(cookieParser())
 
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

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

// Connect to database first, then start server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port "+ PORT);
  });
}).catch((error) => {
  console.error("Failed to connect to database:", error);
  process.exit(1);
});