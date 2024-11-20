import jwt from "jsonwebtoken";
import { User } from "~/utils/interfaces/User";

const config = useRuntimeConfig();

export const generateToken = async (user: User) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiresIn,
    }
  );

  return token;
};
