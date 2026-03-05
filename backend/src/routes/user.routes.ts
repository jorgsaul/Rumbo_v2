import { Router } from "express";
import { upload } from "../lib/multer";
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
  updateAvatar,
  updateBanner,
  adminGetUsers,
  adminUpdateUser,
} from "../controllers/user.controller";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware";

const router = Router();

//Profile
router.patch("/avatar", authMiddleware, upload.single("avatar"), updateAvatar);
router.patch("/banner", authMiddleware, upload.single("banner"), updateBanner);

router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, updateProfile);
router.get("/:userId/posts", authMiddleware, getUserPosts);
router.get("/:userId/likes", authMiddleware, getUserLikes);
router.get("/:userId/saved", authMiddleware, getUserSaved);
router.get("/:userId/comments", authMiddleware, getUserComments);
router.get("/username/:username", authMiddleware, getUserByUsername);
router.post("/:userId/follow", authMiddleware, followUser);
router.get("/search", authMiddleware, searchUsers);

//admin
router.get("/admin/users", authMiddleware, adminMiddleware, adminGetUsers);
router.patch(
  "/admin/users/:userId",
  authMiddleware,
  adminMiddleware,
  adminUpdateUser,
);

export default router;
