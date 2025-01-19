import Driver from "../models/driver.model";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import { createDriver } from "../services/driver.service";
import { AuthenticatedRequest } from "../types/AuthenticatedRequests";

export const registerDriver = async function (req: Request, res: Response) {
  try {
    const { email, fullName, password, vehicle } = req.body;
    let { color, model, vehicleNumber, vehicleType } = vehicle;
    if (
      !email ||
      !fullName ||
      !password ||
      !color ||
      !model ||
      !vehicleNumber ||
      !vehicleType
    ) {
      return ApiResponse(res, 400, false, "All fields are required");
    }

    let driverExists = await Driver.findOne({ email });
    if (driverExists) {
      return ApiResponse(res, 400, false, "Driver already exists");
    }
    let driver = await createDriver({
      fullName,
      password,
      email,
      vehicle: { color, model, vehicleNumber, vehicleType },
    });

    const token = driver.generateAuthToken();
    await driver.save();

    return ApiResponse(res, 201, true, "Driver created successfully", {
      driver,
      token,
    });
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message);
  }
};

export const loginDriver = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return ApiResponse(res, 400, false, "All fields are required");
    }

    let driver = await Driver.findOne({ email }).select("+password");

    if (!driver) {
      return ApiResponse(res, 404, false, "Driver not found");
    }

    const isMatch = await driver.comparePassword(password);
    if (!isMatch) {
      return ApiResponse(res, 401, false, "Invalid credentials");
    }
    const token = driver.generateAuthToken();
    driver.password = "";

    return ApiResponse(res, 200, true, "Driver logged in successfully", {
      token,
      driver,
    });
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message);
  }
};

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const driver = req.driver;
  if (!driver) {
    return ApiResponse(res, 404, false, "Driver not found");
  }
  return ApiResponse(res, 200, true, "Driver retrieved successfully", {
    driver,
  });
};
