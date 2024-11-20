import { generateToken } from "~/server/utils/handlers";
import { USER_ROLES } from "~/utils/interfaces/User";
import { saveUser } from "../../models/User";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = {
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    roles: [USER_ROLES.USER],
  };

  let newUser;
  try {
    newUser = await saveUser(user);
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 400,
      statusMessage: "Something went wrong",
    });
  }

  const token = await generateToken(newUser);

  return { data: { user: newUser, token } };
});
