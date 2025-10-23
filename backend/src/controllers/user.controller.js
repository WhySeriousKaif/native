import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { getAuth,clerkClient } from "@clerk/express";

import Notification from '../models/notification.model.js'

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
    new: true,
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).json(user);
  }
});

export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const existingUser = await User.findOne({ clerkId: userId });

  if (existingUser)
    return res
      .status(200)
      .json({ user: existingUser, message: "User already exists" });

  const clerkUser = await clerkClient.users.getUser(userId);

  const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    firstName: clerkUser.firstName | "",
    lastName: clerkUser.lastName | "",
    profileImageUrl: clerkUser.imageUrl || "",
  };
  const user = await User.create(userData);

  res.status(201).json({ message: "User created Successfully! " });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
});

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req); // currently authenticated userId
  const { targetUserId } = req.params; // user to follow/unfollow

  if (userId === targetUserId)
    return res.status(400).json({ message: "You cannot follow yourself" });

  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser)
    return res.status(404).json({ message: "User not found" });

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    // 🔹 Unfollow
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: targetUserId },
    });

    await User.findByIdAndUpdate(targetUser._id, {
      $pull: { followers: currentUser._id },
    });

    return res.status(200).json({ message: "Unfollowed successfully" });
  } else {
    // 🔹 Follow
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { following: targetUserId },
    });

    await User.findByIdAndUpdate(targetUser._id, {
      $push: { followers: currentUser._id },
    });

    // 🔹 Create a follow notification
    await Notification.create({
      from: currentUser._id,
      to: targetUser._id,
      type: "follow",
    });

    return res.status(200).json({ message: isFollowing ?  "User Unfollowed successfully" : "User followed successfully" });
  }
});
