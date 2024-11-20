import { defineStore } from "pinia";

// Stores
import { useUserStore } from "./user";
import { useRestaurantStore } from "./restaurant";
import { useReservationsStore } from "./reservations";
import { useModalStore } from "./modal";
import { useSnackbarStore } from "./snackbar";
import { useConfirmModalStore } from "./confirmModal";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: useUserStore(),
    restaurant: useRestaurantStore(),
    reservations: useReservationsStore(),
    modal: useModalStore(),
    snackbar: useSnackbarStore(),
    confirmModal: useConfirmModalStore(),
  }),
});
