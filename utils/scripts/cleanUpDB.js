import mongoose from "mongoose";

export const cleanupDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nuxt_app_e2e_test");

    const collections = ["reservations", "users", "restaurants"];

    for (const collection of collections) {
      await mongoose.connection.collection(collection).deleteMany({});
    }

    console.log("Database cleanup completed.");
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.error("Error during database cleanup:", error);
    process.exit(1);
  }
};

cleanupDatabase();
