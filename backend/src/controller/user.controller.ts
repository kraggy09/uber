import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { createUser } from "../services/user.service";
import ApiResponse from "../utils/ApiResponse";
import { AuthenticatedRequest } from "../types/AuthenticatedRequests";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, fullName, password } = req.body;

  try {
    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      fullName,
      password: hashedPassword,
      email,
    });

    const token = user.generateAuthToken();
    await user.save();

    res.status(201).json({
      success: true,
      msg: "User created successfully",
      user,
      token,
    });
  } catch (error: any) {
    console.error(error);

    res
      .status(500)
      .json({ success: false, msg: error.message || "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = user.generateAuthToken();
    user.password = "";
    return ApiResponse(res, 200, true, "User logged in successfully", {
      token,
      user,
    });
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message || "Server error");
  }
};

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const user = req.user;
  if (!user) {
    return ApiResponse(res, 404, false, "User not found");
  }
  return ApiResponse(res, 200, true, "User profile retrieved successfully", {
    user,
  });
};
