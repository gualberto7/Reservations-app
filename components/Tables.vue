<script lang="ts" setup>
// Imports ----
import type { SelectOption } from "~/utils/interfaces/CustomTypes";
import {
  registerSocketEvents,
  unregisterSocketEvents,
} from "~/services/SocketService";

// State ----
const appStore = useAppStore();
const dateOptions: SelectOption[] = [
  {
    label: "Today",
    value: formatDate(new Date()),
  },
  {
    label: "Tomorrow",
    value: formatDate(new Date(new Date().setDate(new Date().getDate() + 1))),
  },
  {
    label: "Day after tomorrow",
    value: formatDate(new Date(new Date().setDate(new Date().getDate() + 2))),
  },
];

// Computed ----
const restaurant = computed(() => {
  return appStore.restaurant.restaurant;
});

const timeOptions = computed(() => {
  if (restaurant.value) {
    return generateTimeOptions(
      restaurant.value.openHours.open,
      restaurant.value.openHours.close
    );
  }
  return [];
});

const filters = computed(() => {
  return appStore.reservations.filters;
});

// Watchers ----
watch(
  filters,
  (newFilters) => {
    handleFilterChange();
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  registerSocketEvents();
  appStore.reservations.setFilters({
    date: dateOptions[0].value,
    startTime: timeOptions.value[0].value,
  });
});

onBeforeUnmount(() => {
  unregisterSocketEvents();
});

// Handlers ----
function handleFilterChange() {
  const query = `?date=${filters.value.date}&startTime=${filters.value.startTime}&endTime=${filters.value.startTime}`;
  appStore.reservations.loadReservations(query, restaurant.value?._id!);
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function generateTimeOptions(
  openTime: string,
  closeTime: string
): SelectOption[] {
  const [openHour] = openTime.split(":").map(Number);
  const [closeHour] = closeTime.split(":").map(Number);
  const options: SelectOption[] = [];

  for (let hour = openHour; hour <= closeHour; hour++) {
    let hours = `${hour.toString().padStart(2, "0")}:00`;
    options.push({ label: hours, value: hours });
  }

  return options;
}
</script>

<template>
  <div>
    <div class="flex items-center justify-evenly my-5">
      <div class="flex gap-5 items-center">
        <h3>Filter</h3>
        <SelectInput
          v-model="filters.date"
          name="date"
          id="date"
          :options="dateOptions"
        />
        <SelectInput
          v-model="filters.startTime"
          name="startTime"
          id="startTime"
          :options="timeOptions"
        />
      </div>
      <div>
        <p>
          Available tables:
          {{
            restaurant?.tables?.length! -
            appStore.reservations.reservations.length
          }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <TableItem
        v-for="table in restaurant?.tables"
        :key="table.number"
        :table="table"
        :filters="filters"
        data-cy="table-item"
      />
    </div>
  </div>
</template>
