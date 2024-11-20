import UserFactory from "../factory/UserFactory.js";

const users = [
  {
    name: "Admin",
    email: "admin@test.com",
    password: "password123",
    roles: ["admin"],
  },
  {
    name: "Customer",
    email: "customer@test.com",
    password: "password123",
    roles: ["user"],
  },
];

export const createUsers = async () => {
  const userFactory = new UserFactory(users);
  await userFactory.save();
  return true;
};
