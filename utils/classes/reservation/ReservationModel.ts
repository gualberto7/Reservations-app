import type {
  Reservation,
  ReservationStatus,
} from "~/utils/interfaces/Reservation";
import type { Restaurant } from "~/utils/interfaces/Restaurant";
import type { User } from "~/utils/interfaces/User";

export default class ReservationModel {
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

  constructor(reservation?: Reservation) {
    this._id = reservation?._id || undefined;
    this.date = reservation?.date || "";
    this.time = reservation?.time || "";
    this.status = reservation?.status || "pending";
    this.table = reservation?.table || { number: 0, seats: 0 };
    this.customerName = reservation?.customerName || "";
    this.customerPhone = reservation?.customerPhone || "";
    this.restaurant = reservation?.restaurant || undefined;
    this.user = reservation?.user || undefined;
  }
}
