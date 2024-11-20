import { deleteReservation } from "../../models/Reservation";

export default defineEventHandler(async (event) => {
  const _id = getRouterParam(event, "_id");

  if (!_id) {
    return {
      status: 400,
      body: {
        message: "Missing _id",
      },
    };
  }

  try {
    await deleteReservation(_id);
    return { data: { status: "OK" } };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error deleting reservation",
        error,
      },
    };
  }
});
