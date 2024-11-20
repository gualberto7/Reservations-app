import { saveRestaurant } from "../../models/Restaurant";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let restaurant;

  try {
    restaurant = await saveRestaurant(body);
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 400,
      statusMessage: "Something went wrong",
    });
  }

  return { data: restaurant };
});
