import { Request } from "express";
import { IUser } from "../models/user.model";
import { IDriver } from "../models/driver.model";

export interface AuthenticatedRequest extends Request {
  user?: IUser;
  driver?: IDriver;
}
