import dotenv from "dotenv";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import connectToDb from "./db/db";
import router from "./routes/routers";
import cookieParser from "cookie-parser";
dotenv.config();

connectToDb();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    msg: "Working Perfectly!! Hello World",
  });
});

export default app;
