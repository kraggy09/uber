import User, { IUser } from "../models/user.model";

interface CreateUserParams {
  fullName: string;
  password: string;
  email: string;
}

export const createUser = async ({
  fullName,
  password,
  email,
}: CreateUserParams): Promise<IUser> => {
  if (!fullName || !password || !email) {
    throw new Error("All fields are required");
  }

  const user = new User({
    fullName,
    email,
    password,
  });
  return user;
};
