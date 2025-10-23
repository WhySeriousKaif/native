import express from "express";

import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
  syncUser,
  followUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

// public route
userRouter.get("/profile/:username", getUserProfile);

// protected routes
userRouter.get("/sync", protectRoute, syncUser);
userRouter.get("/me", protectRoute, getCurrentUser);
userRouter.put("/profile", protectRoute, updateUserProfile);
userRouter.put("/follow/:targetUserId", protectRoute, followUser);

// update profile => we need middleware

export default userRouter;
