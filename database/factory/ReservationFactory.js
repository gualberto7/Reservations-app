import mongoose from "mongoose";
import bcrypt from "bcrypt";

export default class UserFactory {
  user = {
    name: "Admin",
    email: "admin@test.com",
    password: "password123",
    roles: ["admin"],
  };
  user2 = {
    name: "Customer",
    email: "customer@test.com",
    password: "password123",
    roles: ["user"],
  };
  restaurant = {
    name: "Restaurant 1",
    address: "August 6 Avenue",
    phone: "78659834",
    email: "restaurant1@test.com",
    owner: "",
    menu: [],
    tables: [
      {
        number: 1,
        seats: 4,
        available: true,
      },
      {
        number: 2,
        seats: 4,
        available: true,
      },
      {
        number: 3,
        seats: 4,
        available: true,
      },
      {
        number: 4,
        seats: 4,
        available: true,
      },
      {
        number: 5,
        seats: 4,
        available: true,
      },
      {
        number: 6,
        seats: 4,
        available: true,
      },
      {
        number: 7,
        seats: 4,
        available: true,
      },
      {
        number: 8,
        seats: 4,
        available: true,
      },
    ],
    openHours: {
      open: "11:00",
      close: "14:00",
    },
  };
  reservations = [];

  constructor(reservations) {
    this.reservations = reservations;
  }

  async save() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/nuxt_app_e2e_test");
      const password = await bcrypt.hash(this.user.password, 10);
      this.user.password = password;
      this.user2.password = password;
      const owner = await mongoose.connection
        .collection("users")
        .insertOne(this.user);
      await mongoose.connection.collection("users").insertOne(this.user2);

      this.restaurant.owner = owner.insertedId;
      const restaurant = await mongoose.connection
        .collection("restaurants")
        .insertOne(this.restaurant);

      for (let reservation of this.reservations) {
        reservation.restaurant = restaurant.insertedId;
        await mongoose.connection
          .collection("reservations")
          .insertOne(reservation);
      }

      await mongoose.disconnect();

      return this.reservations;
    } catch (error) {
      console.error("Error seeding reservations: ", error);
      process.exit(1);
    }
  }
}
