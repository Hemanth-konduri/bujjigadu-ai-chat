import express from "express";

const router = express.Router();

router.get("/signup", (req, res)=>{
    res.send("This is signup form...");
})

router.get("/signin", (req, res)=>{
    res.send("This is signin form...");
})

router.get("/logout", (req, res)=>{
    res.send("This is logout button...");
})

export default router;