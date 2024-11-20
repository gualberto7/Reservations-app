import { updateReservation } from "../../models/Reservation";

export default defineEventHandler(async (event) => {
  const _id = getRouterParam(event, "_id");
  const reservation = await readBody(event);

  if (!_id) {
    return {
      status: 400,
      body: {
        message: "Missing _id",
      },
    };
  }

  try {
    const newReservation = await updateReservation(_id, reservation);
    return { data: newReservation };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error updating reservation",
        error,
      },
    };
  }
});
