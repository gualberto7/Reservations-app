import { type Restaurant } from "./Restaurant";

export interface User {
  _id?: string;
  name: string;
  phone?: string;
  email: string;
  password: string;
  roles: string[];
  token?: string;
  restaurant?: Restaurant;
  password_confirmation?: string;
}

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};
