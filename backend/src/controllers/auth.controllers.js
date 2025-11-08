import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res)=>{
    const {fullName, email, password} = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({error: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({error: "Password must be at least 6 characters"});
        }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        return res.status(400).json({error: "Invalid email address"});
      }

      const user = await User.findOne({email});
      if(user){
        return res.status(400).json({error: "User already exists"});
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword
      });

      if(newUser){
         const savedUser = await newUser.save();
        generateToken(newUser._id, res);
       

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        })

       // Email sending disabled for development
        try {
          await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
        } catch (error) {
          console.error("Error sending welcome email:", error);
        }
      }else{
        return res.status(400).json({error: "Invalid user data"})
      }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Server error"});
        
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({error: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error: "Invalid email or password"});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Server error"});
    }
}


export const logout = (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const updateProfile = async (req, res) =>{
  try {
    const {profilePic} = req.body;
    if(!profilePic){
      return res.status(400).json({message:"Profile pic is required."})
    }
    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true});
    res.status(200).json(updateUser);
  } catch (error) {
     console.log("Error in uploading Profile ", error.message);
        res.status(500).json({error: "Internal server error"});
    
  }
}