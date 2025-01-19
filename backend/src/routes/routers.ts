import express from "express";
import driverRouter from "./driver.route";
import userRoute from "./user.route";
import mapRoute from "./maps.route";

const router = express.Router();
router.use("/driver", driverRouter);
router.use("/user", userRoute);
router.use("/maps", mapRoute);
export default router;
