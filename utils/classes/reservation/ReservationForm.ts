import type { Reservation } from "~/utils/interfaces/Reservation";
import ReservationModel from "./ReservationModel";
import Form from "../Form";

export default class ReservationForm extends Form<Reservation> {
  constructor(reservation?: Reservation) {
    super(new ReservationModel(reservation));

    this.rules = {
      date: "required",
      time: "required",
      customerName: "required|string",
      customerPhone: "string",
    };

    this.labels = {
      date: "Date",
      time: "Time",
      "table.number": "Table Number",
      customerName: "Customer Name",
      customerPhone: "Customer Phone",
    };
  }

  submit() {
    console.log("Submit reservation form", this.model);
  }
}
