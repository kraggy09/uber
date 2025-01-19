import express from "express";
import {
  getProfile,
  loginDriver,
  registerDriver,
} from "../controller/driver.controller";
import { authDriver } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.get("/profile", authDriver, getProfile);

export default router;
