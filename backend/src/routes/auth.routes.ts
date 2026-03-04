import { Router } from "express";
import {
  register,
  login,
  logout,
  googleAuth,
} from "../controllers/auth.controller";

const router = Router();

router.post("/google", googleAuth);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
