<script lang="ts" setup>
import type { Form } from "~/utils/interfaces/Form";
import { get, set } from "lodash";

const props = defineProps({
  field: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
});

const form = inject<Form>("form")!;
const field = props.field ?? inject("field")!;
const wasTouched = ref(false);

const errorMessage = computed(() => {
  if (!wasTouched.value) return "";
  return form.errors[field] ?? "";
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  set(form.model, field, target.value);
};
</script>

<template>
  <input
    :value="get(form.model, field)"
    :id="field"
    @blur="wasTouched = true"
    @input="handleInput"
    :type="type"
    :data-cy="`${field}-input`"
    class="form-input mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm"
    :class="{
      'border-red-500 focus:ring-red-500 focus:border-red-500': errorMessage,
    }"
  />
  <span :id="`${field}-error`" class="text-red-500 text-xs">{{
    errorMessage
  }}</span>
</template>
