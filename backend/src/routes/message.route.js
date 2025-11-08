import express from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controllers.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { arcjetProjection } from "../middlewares/arcjet.middleware.js";

const router = express.Router();

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
router.use(arcjetProjection, protectedRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;