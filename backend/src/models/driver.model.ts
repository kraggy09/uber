import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Document, Model } from "mongoose";
export interface IDriver extends Document {
  fullName: string;
  email: string;
  password: string;
  socketId?: string;
  status: "active" | "inactive";
  vehicle: {
    color: string;
    model: string;
    vehicleNumber: string;
    vehicleType: "car" | "bike" | "sedan" | "xl";
  };
  location: {
    lat: number;
    long: number;
  };
  generateAuthToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

interface IDriverModel extends Model<IDriver> {
  hashPassword(password: string): Promise<string>;
}

const driverSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: [3, "Full name should of minimum 3 chars"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      vehicleNumber: {
        type: String,
        required: true,
        length: [10, "Vehicle number should be of  10 chars"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "bike", "sedan", "xl"],
      },
    },
    location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

driverSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN as string, {
    expiresIn: "24h",
  });
  return token;
};

driverSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

driverSchema.statics.hashPassword = function (password: string) {
  return bcrypt.hash(password, 10);
};

let Driver = mongoose.model<IDriver, IDriverModel>("Driver", driverSchema);

export default Driver;
