import ReservationFactory from "../factory/ReservationFactory.js";

const currentDate = new Date().toISOString().split("T")[0];
const reservations = [
  {
    date: currentDate,
    time: "11:00",
    status: "active",
    table: {
      number: 1,
      seats: 4,
    },
    customerName: "Juan Garnacho",
    customerPhone: "78654525",
    restaurant: "",
  },
  {
    date: currentDate,
    time: "11:00",
    status: "active",
    table: {
      number: 3,
      seats: 4,
    },
    customerName: "John Doe",
    customerPhone: "78654525",
    restaurant: "",
  },
];

export const createReservations = async () => {
  const reservation = new ReservationFactory(reservations);
  await reservation.save();
  return true;
};
