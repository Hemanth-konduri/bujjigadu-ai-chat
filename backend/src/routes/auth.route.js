import express from "express";
import { signup, login, logout, updateProfile, googleCallback } from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { arcjetProjection } from "../middlewares/arcjet.middleware.js";
import passport from '../lib/passport.js';

const router = express.Router();

router.use(arcjetProjection);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-profile",protectedRoute, updateProfile);
router.get("/check", protectedRoute, (req, res)=> res.status(200).json(req.user));

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);

export default router;