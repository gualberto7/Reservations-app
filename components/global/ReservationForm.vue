<script lang="ts" setup>
import ReservationForm from "~/utils/classes/reservation/ReservationForm";
import type { Reservation } from "~/utils/interfaces/Reservation";

// Props ----
const props = defineProps({
  arg: {
    type: Object,
    required: false,
  },
});

// State ----
const { modal, user } = useAppStore();
const form = new ReservationForm(props.arg?.form as Reservation | undefined);
const { addReservation, removeReservation, acceptReservation } =
  useReservations(form.model);

// Handlers ----
const handleSubmit = async () => {
  if (form.model._id && props.arg?.state == "Requested") {
    await acceptReservation();
  } else {
    await addReservation();
  }
};
</script>

<template>
  <div>
    <Form :form="form" @on-submit="handleSubmit">
      <div class="modal-title">
        <h1 data-cy="reservation-modal-title">Reservation Form</h1>
      </div>
      <div class="modal-body">
        <div class="grid grid-cols-2 gap-2">
          <div class="mb-4">
            <FieldContainer field="date">
              <Label />
              <Input type="date" />
            </FieldContainer>
          </div>
          <div class="mb-4">
            <FieldContainer field="time">
              <Label />
              <Input type="time" />
            </FieldContainer>
          </div>
        </div>
        <div class="mb-4">
          <FieldContainer field="table.number">
            <Label />
            <Input />
          </FieldContainer>
        </div>
        <div class="mb-4">
          <FieldContainer field="customerName">
            <Label />
            <Input />
          </FieldContainer>
        </div>
        <div class="mb-4">
          <FieldContainer field="customerPhone">
            <Label />
            <Input />
          </FieldContainer>
        </div>
      </div>
      <div class="modal-footer">
        <Button data-cy="save-button" type="submit">Save</Button>
        <Button
          v-if="user.isAdmin && arg?.state == 'Requested'"
          @click="removeReservation"
          emphasis="danger"
          type="button"
          >Reject</Button
        >
        <Button
          @click="modal.hide()"
          emphasis="secondary"
          data-cy="cancel-button"
          type="button"
          >Cancel</Button
        >
      </div>
    </Form>
  </div>
</template>
