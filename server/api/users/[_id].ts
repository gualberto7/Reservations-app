import { find } from "../../models/User";
//import authMiddleware from "~/server/middleware/auth";

export default defineEventHandler(async (event) => {
  //await authMiddleware(event);

  const _id = getRouterParam(event, "_id");
  const user = await find({ _id });
  return { data: user };
});
