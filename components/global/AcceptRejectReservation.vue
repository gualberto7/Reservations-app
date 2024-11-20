<script setup lang="ts">
const props = defineProps({
  arg: {
    type: Object,
    required: false,
  },
});

const nuxtApp: any = useNuxtApp();
const { modal, reservations, snackbar } = useAppStore();
const form = reactive(props.arg?.form);
</script>

<template>
  <div>
    <div class="modal-title">
      <h1>Accept / Reject Reservation</h1>
    </div>
    <div class="modal-body">
      <div class="grid grid-cols-2 gap-2">
        <div class="mb-4">
          <label for="date">Date</label>
          <input
            v-model="form.date"
            name="date"
            type="date"
            id="date"
            class="w-full border p-2"
          />
        </div>
        <div class="mb-4">
          <label for="time">Time</label>
          <input
            v-model="form.time"
            name="time"
            type="time"
            id="time"
            class="w-full border p-2"
          />
        </div>
      </div>
      <div class="mb-4">
        <label for="table">Table</label>
        <input
          v-model="form.table.number"
          name="table"
          type="select"
          id="table"
          class="w-full border p-2"
        />
      </div>
      <div class="mb-4">
        <TextField
          v-model="form.customerName"
          label="Customer Name"
          name="customerName"
          id="customerName"
        />
      </div>
      <div class="mb-4">
        <TextField
          v-model="form.customerPhone"
          label="Customer Phone"
          name="customerPhone"
          id="customerPhone"
        />
      </div>
    </div>
    <div class="modal-footer">
      <Button>Accept</Button>
      <Button emphasis="secondary">Reject</Button>
    </div>
  </div>
</template>
