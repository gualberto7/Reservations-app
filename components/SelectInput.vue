<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div>
    <select
      :value="modelValue"
      :id="name"
      :name="name"
      @change="onChange"
      class="form-input mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
