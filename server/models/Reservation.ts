import mongoose from "mongoose";
import { defineMongooseModel } from "#nuxt/mongoose";
import { type Reservation as ReservationInterface } from "~/utils/interfaces/Reservation";

export const Reservation = defineMongooseModel<ReservationInterface>({
  name: "Reservation",
  schema: {
    date: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    time: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    table: {
      number: {
        type: mongoose.Schema.Types.Number,
        required: true,
      },
      seats: {
        type: mongoose.Schema.Types.Number,
        required: true,
      },
    },
    customerName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    customerPhone: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
});

export const listReservations = async (query: any) => {
  return await Reservation.find(query).populate("user");
};

export const dashboardReservations = async (query: any) => {
  return await Reservation.find(query);
};

export const saveReservation = async (reservation: ReservationInterface) => {
  const newReservation = new Reservation(reservation);
  return (await newReservation.save()).populate("user");
};

export const updateReservation = async (
  _id: string,
  reservation: ReservationInterface
) => {
  return await Reservation.updateOne({ _id }, reservation).populate("user");
};

export const deleteReservation = async (_id: string) => {
  return await Reservation.deleteOne({ _id });
};

export const getReservation = async (_id: string) => {
  return await Reservation.findById(_id).populate("user");
};
