import dotenv from "dotenv";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import connectToDb from "./db/db";

dotenv.config();

connectToDb();

const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    msg: "Working Perfectly!! Hello World",
  });
});

// Export the Express app
export default app;
