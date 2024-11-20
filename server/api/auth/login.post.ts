import { find } from "../../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/handlers";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let user = await find({ email: body.email });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid credentials",
    });
  }

  if (!bcrypt.compareSync(body.password, user.password)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid credentials",
    });
  }

  const token = await generateToken(user);

  return { data: { user, token } };
});
