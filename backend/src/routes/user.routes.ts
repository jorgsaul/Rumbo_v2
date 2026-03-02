import { Router } from "express";
import {
  getMe,
  updateProfile,
  getUserComments,
  getUserLikes,
  getUserPosts,
  getUserSaved,
  getUserByUsername,
  followUser,
  searchUsers,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, updateProfile);
router.get("/:userId/posts", authMiddleware, getUserPosts);
router.get("/:userId/likes", authMiddleware, getUserLikes);
router.get("/:userId/saved", authMiddleware, getUserSaved);
router.get("/:userId/comments", authMiddleware, getUserComments);
router.get("/username/:username", authMiddleware, getUserByUsername);
router.post("/:userId/follow", authMiddleware, followUser);
router.get("/search", authMiddleware, searchUsers);

export default router;
