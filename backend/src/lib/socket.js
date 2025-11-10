import {Server} from "socket.io";
import { ENV } from "./env.js";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ENV.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.use(socketAuthMiddleware);

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on("connection", (socket)=>{
    console.log(`User connected: ${socket.user.fullName} (ID: ${socket.userId})`);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

//apply authentication middleware to all socket connections
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", ()=>{
        console.log(`User disconnected: ${socket.user.fullName} (ID: ${socket.userId})`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });


});

export { io, app, server};



