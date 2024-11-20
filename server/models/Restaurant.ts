import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";
import { type Restaurant as RestaurantInterface } from "~/utils/interfaces/Restaurant";

export const Restaurant = defineMongooseModel<RestaurantInterface>({
  name: "Restaurant",
  schema: {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    phone: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menu: {
      type: [mongoose.Schema.Types.String],
      required: false,
    },
    tables: {
      type: [
        {
          number: {
            type: mongoose.Schema.Types.Number,
            required: true,
          },
          seats: {
            type: mongoose.Schema.Types.Number,
            required: false,
            default: 4,
          },
          available: {
            type: mongoose.Schema.Types.Boolean,
            required: false,
            default: true,
          },
        },
      ],
      required: false,
    },
    openHours: {
      open: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
      close: {
        type: mongoose.Schema.Types.String,
        required: false,
      },
    },
  },
  options: {},
  hooks(schema) {},
});

export const saveRestaurant = async (
  restaurant: RestaurantInterface
): Promise<RestaurantInterface> => {
  const newRestaurant = new Restaurant(restaurant);
  return await newRestaurant.save();
};

export const index = async (): Promise<RestaurantInterface[]> => {
  return await Restaurant.find().populate("owner");
};

export const getRestaurant = async (
  query: any
): Promise<RestaurantInterface | null> => {
  return await Restaurant.findOne(query);
};
