<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [String, Number],
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
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const wasTouched = ref(false);

function onChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
function onBlur() {
  wasTouched.value = true;
}

const errorMessage = computed(() => {
  if (!wasTouched.value) return "";
  return props.rules.find((rule: any) => rule !== undefined);
});
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="$props.required" class="text-red-500">*</span>
    </label>
    <input
      :id="name"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @change="onChange"
      @blur="onBlur"
      class="form-input mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <span v-if="rules.length" class="text-rose-500 text-sm tracking-wider">{{
      errorMessage
    }}</span>
  </div>
</template>
