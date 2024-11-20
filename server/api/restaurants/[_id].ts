import { getRestaurant } from "~/server/models/Restaurant";

export default defineEventHandler(async (event) => {
  const restaurantId = getRouterParam(event, "_id");
  let restaurant;

  try {
    restaurant = await getRestaurant({ _id: restaurantId });
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 400,
      statusMessage: "Something went wrong",
    });
  }

  return { data: restaurant };
});
