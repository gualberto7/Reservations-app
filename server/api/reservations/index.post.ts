import { saveReservation, updateReservation } from "../../models/Reservation";

export default defineEventHandler(async (event) => {
  const reservation = await readBody(event);
  try {
    if (reservation._id) {
      const newReservation = await updateReservation(
        reservation._id,
        reservation
      );
      return { data: { updated: true } };
    }
    const newReservation = await saveReservation(reservation);
    return { data: newReservation };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error saving reservation",
        error,
      },
    };
  }
});
