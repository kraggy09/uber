import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import {
  getAddressCoordinates,
  getAutoCompleteSuggestions,
  getDistanceTimeService,
} from "../services/maps.service";

export const getCoordinates = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { address } = req.query;
    if (!address) {
      return ApiResponse(res, 400, false, "Address is required");
    }
    const coordinate = getAddressCoordinates(address as string);
    return ApiResponse(res, 200, true, "Coordinates fetched successfully", {
      coordinate,
    });
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message);
  }
};

export const getDistanceTime = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { origin, destination } = req.query;
    if (!origin || !destination) {
      return ApiResponse(
        res,
        400,
        false,
        "Origin and Destination are required"
      );
    }
    let distanceTime = await getDistanceTimeService(
      origin as string,
      destination as string
    );
    return ApiResponse(
      res,
      200,
      true,
      "Distance and Time fetched successfully",
      {
        distanceTime,
      }
    );
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message);
  }
};

export const getSuggestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { input } = req.query;
  if (!input) {
    return ApiResponse(res, 400, false, "Input is required");
  }
  try {
    const suggestion = getAutoCompleteSuggestions(input as string);
    return ApiResponse(res, 200, true, "Suggestions fetched successfully", {
      suggestion,
    });
  } catch (error: any) {
    return ApiResponse(res, 500, false, error.message);
  }
};
