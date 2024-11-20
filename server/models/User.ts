import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";
import { type User as UserInterface } from "~/utils/interfaces/User";
import { Restaurant } from "./Restaurant";

const User = defineMongooseModel<UserInterface>({
  name: "User",
  schema: {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    roles: {
      type: [mongoose.Schema.Types.String],
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  options: {},
  hooks(schema) {},
});

export const saveUser = async (user: UserInterface): Promise<UserInterface> => {
  const newUser = new User(user);
  return await newUser.save();
};

export const find = async (query: any): Promise<UserInterface | null> => {
  const user = await User.findOne(query);
  const restaurant = await Restaurant.findOne({ owner: user?._id });
  if (user && restaurant) {
    user.restaurant = restaurant;
  }
  return user;
};
