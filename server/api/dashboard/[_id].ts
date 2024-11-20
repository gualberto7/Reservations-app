export default defineEventHandler(async (event) => {
  const restaurant = getRouterParam(event, "_id");
  const query = getQuery(event);
  try {
    const reservations = await dashboardReservations({
      restaurant,
      date: { $gte: query.startDate, $lte: query.endDate },
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
