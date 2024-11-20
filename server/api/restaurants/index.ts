import { index } from "../../models/Restaurant";

export default defineEventHandler(async (event) => {
  let restaurants;

  try {
    restaurants = await index();
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 400,
      statusMessage: "Something went wrong",
    });
  }

  return { data: restaurants };
});
