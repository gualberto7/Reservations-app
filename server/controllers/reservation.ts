import { Reservation } from "~/utils/interfaces/Reservation";

export const createOrUpdateReservation = async (reservation: Reservation) => {
  try {
    if (reservation._id) {
      await updateReservation(reservation._id, reservation);
      const newReservation = await getReservation(reservation._id);
      return { data: { updated: true, data: newReservation } };
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
};

export const removeReservation = async (id: string) => {
  try {
    await deleteReservation(id);
    return { data: { status: "OK", _id: id } };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error deleting reservation",
        error,
      },
    };
  }
};
