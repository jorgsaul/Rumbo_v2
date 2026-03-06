import { Router } from "express";
import {
  register,
  login,
  logout,
  googleAuth,
  forgotPassword,
  resetPassword,
  sendVerificationCode,
  verifyCode,
} from "../controllers/auth.controller";

const router = Router();

router.post("/google", googleAuth);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/send-code", sendVerificationCode);
router.post("/verify-code", verifyCode);

export default router;
