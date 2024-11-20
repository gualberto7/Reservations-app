import { type Restaurant } from "./Restaurant";
import { type User } from "./User";

export interface Reservation {
  _id?: string;
  date: string;
  time: string;
  status: ReservationStatus;
  table: {
    number: number;
    seats: number;
  };
  customerName: string;
  customerPhone: string;
  restaurant?: Restaurant;
  user?: User;
}

export type ReservationStatus = "pending" | "active" | "cancelled";
