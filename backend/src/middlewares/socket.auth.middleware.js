import jwt from 'jsonwebtoken';
import { ENV } from '../lib/env.js';
import User from '../models/User.js';

export const socketAuthMiddleware = async (socket, next) => {
    try {
//extract tokens from http only cookies
        const token = socket.handshake.headers.cookie
        ?.split('; ')
        .find((row)=>row.startsWith('jwt='))
        ?.split('=')[1];

         if (!token) {
            console.log("Socket connection rejected: No token provided.")
            return next(new Error('Authentication error: Token not provided'));
        }
        // verify the token
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
       if(!decoded){
        console.log("Socket connection rejected: Invalid token.")
        return next(new Error('Authentication error: Invalid token'));
       }
    
           const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            console.log("Socket connection rejected: User not found.")
            return next(new Error('Authentication error: User not found'));
        }

        socket.user = user; // attach user to socket object
        socket.userId = user._id.toString();
        next(); // proceed to next middleware or to connection


    }
    catch (error) {
        console.error('Socket authentication error:', error);
        next(new Error('Authentication error'));
    }
};
