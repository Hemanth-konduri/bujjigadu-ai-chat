import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) =>{

    const {JWT_SECRET}= ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({id: userId}, JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "development"? false: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return token;
}