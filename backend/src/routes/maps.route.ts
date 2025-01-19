import express from "express";
import { authUser, authDriver } from "../middleware/auth.middleware";
import {
  getCoordinates,
  getDistanceTime,
  getSuggestions,
} from "../controller/maps.controller";

const router = express.Router();

router.use(authUser);
router.get("/get-cooordinates", getCoordinates);
router.get("/get-distance-time", getDistanceTime);
router.get("/get-suggestions", getSuggestions);
export default router;
