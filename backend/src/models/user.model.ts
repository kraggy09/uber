import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  fullName: string;
  email: string;
  socketId?: string;
  password: string;
  generateAuthToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<string>;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      minLength: [3, "First name must be 3 chars long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    socketId: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN as string, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  let isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

userSchema.statics.hashPassword = function (password: string): Promise<string> {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);
export default User;
