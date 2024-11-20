import { listReservations } from "~/server/models/Reservation";

export default defineEventHandler(async (event) => {
  const restaurant = getRouterParam(event, "_id");
  const query = getQuery(event);
  try {
    const reservations = await listReservations({
      restaurant,
      date: query.date,
      time: { $gte: query.startTime, $lte: query.endTime },
    });
    return { data: reservations };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error listing reservations",
        error,
      },
    };
  }
});
