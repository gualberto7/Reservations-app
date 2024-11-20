<script lang="ts" setup>
import RestaurantForm from "~/utils/classes/restaurant/RestaurantForm";
import type { Table } from "~/utils/interfaces/Restaurant";

const form = new RestaurantForm();
const tablesCount = ref("0");
const { user } = useUserStore();

const handleSubmit = () => {
  setTables();
  form.model.owner = user!;
  form.submit();
};

const setTables = () => {
  let tables: Table[] = [];
  for (let i = 0; i < parseInt(tablesCount.value); i++) {
    tables.push({
      number: i + 1,
      available: true,
    });
  }
  form.model.tables = tables;
};
</script>

<template>
  <Form :form="form" @submit.prevent="handleSubmit">
    <div class="mb-3">
      <FieldContainer field="name">
        <Label />
        <Input />
      </FieldContainer>
    </div>
    <div class="mb-3">
      <FieldContainer field="address">
        <Label />
        <Input />
      </FieldContainer>
    </div>
    <div class="mb-3 grid grid-cols-2 gap-2">
      <div>
        <FieldContainer field="phone">
          <Label />
          <Input />
        </FieldContainer>
      </div>
      <div>
        <TextField
          v-model="tablesCount"
          type="number"
          id="tablesCount"
          name="tablesCount"
          label="Total Tables"
          required
          data-cy="tables-count-input"
        />
      </div>
    </div>
    <div class="mb-3">
      <FieldContainer field="email">
        <Label />
        <Input />
      </FieldContainer>
    </div>
    <div class="mb-3 grid grid-cols-2 gap-2">
      <div>
        <FieldContainer field="openHours.open">
          <Label />
          <Input type="time" />
        </FieldContainer>
      </div>
      <div>
        <FieldContainer field="openHours.close">
          <Label />
          <Input type="time" />
        </FieldContainer>
      </div>
    </div>
    <Button
      type="submit"
      data-cy="create-button"
      :disabled="form.processing.value"
      >Create</Button
    >
  </Form>
</template>
