import Driver, { IDriver } from "../models/driver.model";

interface CreateDriverParams {
  fullName: string;
  password: string;
  email: string;
  vehicle: {
    color: string;
    model: string;
    vehicleNumber: string;
    vehicleType: "car" | "bike" | "sedan" | "xl";
  };
}

export const createDriver = async ({
  fullName,
  password,
  email,
  vehicle,
}: CreateDriverParams): Promise<IDriver> => {
  if (!fullName || !password || !email || !vehicle) {
    throw new Error("All fields are required");
  }

  const driver = new Driver({
    fullName,
    email,
    password,
    vehicle,
  });
  return driver;
};
