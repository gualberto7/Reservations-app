// server/middleware/auth.js
import jwt from "jsonwebtoken";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const publicPaths = ["/api/auth/login", "/api/auth/register"];
  if (
    !event.req ||
    !event.req.url?.startsWith("/api") ||
    event.req.url?.startsWith("/api/socket.io") ||
    publicPaths.includes(event.req.url)
  ) {
    return;
  }

  console.log("REQUEST: ", event.req.url);

  const token = event.req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    event.context.user = decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid token",
    });
  }
});
