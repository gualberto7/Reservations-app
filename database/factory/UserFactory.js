import mongoose from "mongoose";
import bcrypt from "bcrypt";

export default class UserFactory {
  users = [
    {
      name: "Test User",
      email: "user@test.com",
      password: "password123",
      roles: ["user"],
    },
  ];

  constructor(users = []) {
    this.users = users.length ? users : this.users;
  }

  async save() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/nuxt_app_e2e_test");

      for (let user of this.users) {
        user.password = await bcrypt.hash(user.password, 10);
        await mongoose.connection.collection("users").insertOne(user);
      }

      await mongoose.disconnect();

      return this.users;
    } catch (error) {
      console.error("Error seeding users: ", error);
      process.exit(1);
    }
  }
}
