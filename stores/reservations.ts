import type { Reservation } from "~/utils/interfaces/Reservation";

export const useReservationsStore = defineStore("reservations", () => {
  // State ----
  const nuxtApp: any = tryUseNuxtApp();
  const reservations = ref<Reservation[]>([]);
  const filters = reactive({
    date: "",
    startTime: "",
  });

  // Actions ----
  const setFilters = (newFilters: { date: string; startTime: string }) => {
    filters.date = newFilters.date;
    filters.startTime = newFilters.startTime;
  };

  const loadReservations = async (query: string, restaurantId: string) => {
    const { data } = await nuxtApp.$fetch(
      `/api/restaurants/${restaurantId}/reservations${query}`
    );
    reservations.value = data;
  };

  const setReservations = (newReservations: Reservation[]) => {
    reservations.value = newReservations;
  };

  const addReservation = (newReservation: Reservation) => {
    if (matchFilters(newReservation)) {
      reservations.value.push(newReservation);
    }
  };

  const markReservationAsConfirmed = async (_id: string) => {
    const reservation = reservations.value.find(
      (reservation) => reservation._id === _id
    );
    if (reservation) {
      reservation.status = "active";
    }
  };

  const removeReservation = async (_id: string) => {
    reservations.value = reservations.value.filter(
      (reservation) => reservation._id !== _id
    );
  };

  const updateReservation = async (reservation: Reservation) => {
    if (!matchFilters(reservation)) {
      removeReservation(reservation._id!);
      return;
    }
    const index = reservations.value.findIndex(
      (res) => res._id === reservation._id
    );
    if (index !== -1) {
      reservations.value[index] = reservation;
    }
  };

  const matchFilters = (reservation: Reservation) => {
    return (
      reservation.date === filters.date &&
      reservation.time === filters.startTime
    );
  };

  // Getters ----
  const getReservations = computed(() => reservations.value);
  const getFilters = computed(() => filters);

  return {
    // getters
    reservations: getReservations,
    filters: getFilters,

    // actions
    setReservations,
    loadReservations,
    addReservation,
    removeReservation,
    markReservationAsConfirmed,
    updateReservation,
    setFilters,
  };
});
