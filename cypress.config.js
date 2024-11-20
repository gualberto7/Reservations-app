import { defineConfig } from "cypress";
import { cleanupDatabase } from "./utils/scripts/cleanUpDB.js";
import { createUsers } from "./database/seeder/UserSeeder.js";
import { createReservations } from "./database/seeder/ReservationSeeder.js";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async "db:cleanup"() {
          return await cleanupDatabase();
        },
        async "db:seed-users"() {
          return await createUsers();
        },
        async "db:seed-reservations"() {
          return await createReservations();
        },
      });
    },
    baseUrl: "http://localhost:3000",
  },
});
