<script lang="ts" setup>
import type { Reservation } from "~/utils/interfaces/Reservation";
import ReservationEvents from "~/services/ReservationEvents";
import { type Table } from "~/utils/interfaces/Restaurant";

const props = defineProps({
  table: {
    type: Object as PropType<Table>,
    required: true,
  },
  filters: {
    type: Object as PropType<Record<string, string>>,
    required: false,
  },
});

const appStore = useAppStore();
const reservationForm = reactive<Reservation>({
  _id: "",
  date: props.filters?.date ?? "",
  time: props.filters?.startTime ?? "",
  status: "active",
  table: {
    number: props.table.number,
    seats: 4,
  },
  customerName: "",
  customerPhone: "",
  restaurant: appStore.restaurant.restaurant ?? undefined,
  user: undefined,
});
const reservationEvents = new ReservationEvents();
//const { cancelReservationRequest } = useReservations(reservationForm);

const reservations = computed(() => {
  return appStore.reservations.reservations;
});

const tableStatus = computed(() => {
  const reservation = getReservation();
  if (!reservation) return { css: "bg-green-200", label: "Available" };
  switch (reservation.status) {
    case "pending":
      return { css: "bg-yellow-200", label: "Requested" };
    case "active":
      return { css: "bg-red-200", label: "Occupied" };
    default:
      return { css: "bg-green-200", label: "Available" };
  }
});

const getReservation = () => {
  const reservation = reservations.value.find((reservation) => {
    return reservation.table.number === props.table.number;
  });
  return reservation;
};

const bookTable = async () => {
  prePopulateForm();
  if (!appStore.user.isAdmin && tableStatus.value.label === "Requested") {
    const res = await appStore.confirmModal.confirm(
      "Are you sure you want to cancel reservation request?",
      ""
    );
    if (res) {
      await reservationEvents.removeReservation(reservationForm._id!);
      appStore.reservations.removeReservation(reservationForm._id!);
      appStore.snackbar.show("Reservation request cancelled", "success");
    }
  } else {
    appStore.modal.show("ReservationForm", {
      form: reservationForm,
      state: tableStatus.value.label,
    });
  }
};

const prePopulateForm = () => {
  reservationForm._id = getReservation()?._id;
  reservationForm.date = props.filters?.date ?? "";
  reservationForm.time = props.filters?.startTime ?? "";
  if (appStore.user.user && !appStore.user.isAdmin) {
    reservationForm.status = "pending";
    reservationForm.customerName = appStore.user.user.name;
    reservationForm.customerPhone = appStore.user.user.phone ?? "";
    reservationForm.user = appStore.user.user ?? "";
  }
  if (appStore.user.isAdmin) {
    reservationForm.customerName = getReservation()?.customerName ?? "";
    reservationForm.customerPhone = getReservation()?.customerPhone ?? "";
    reservationForm.user = getReservation()?.user;
  }
};

const buttonLabel = computed(() => {
  if (!appStore.user.isAdmin) {
    if (tableStatus.value.label == "Requested") return "Cancel";
    return "Book";
  }

  if (tableStatus.value.label == "Available") return "Book";
  if (tableStatus.value.label == "Requested") return "Accept / Reject";
  if (tableStatus.value.label == "Occupied") return "Update";
});

const disabled = computed(() => {
  return !appStore.user.isAdmin && tableStatus.value.label === "Occupied";
});
</script>

<template>
  <div class="border">
    <div
      :class="tableStatus.css"
      class="h-20 flex flex-col items-center justify-center"
    >
      <h2 class="text-xl font-bold tracking-wider">T-{{ table.number }}</h2>
      <p class="text-sm">{{ tableStatus.label }}</p>
    </div>
    <div class="px-3 py-1">
      <Button
        size="sm"
        emphasis="primary"
        block
        :disabled="disabled"
        @click="bookTable"
        data-cy="table-action-button"
      >
        {{ buttonLabel }}
      </Button>
    </div>
  </div>
</template>
