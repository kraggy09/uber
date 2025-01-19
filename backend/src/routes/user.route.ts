import express, { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  getProfile,
} from "../controller/user.controller";
import { authUser } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authUser, getProfile);

export default router;
