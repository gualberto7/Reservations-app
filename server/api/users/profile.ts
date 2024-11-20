import { find } from "../../models/User";

export default defineEventHandler(async (event) => {
  const _id = event.context.user._id;
  const user = await find({ _id });
  return { data: user };
});
