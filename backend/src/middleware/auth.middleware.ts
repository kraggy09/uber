import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import { AuthenticatedRequest } from "../types/AuthenticatedRequests";

export const authUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return ApiResponse(res, 401, false, "No token found");
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN as string);
    const user = await User.findById(decoded._id);
    if (!user) {
      return ApiResponse(res, 404, false, "User not found");
    }

    req.user = user;
    next();
  } catch (error: any) {
    return ApiResponse(res, 401, false, error.message || "Bad Token");
  }
};
