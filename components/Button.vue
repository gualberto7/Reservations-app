<script setup lang="ts">
interface ButtonProps {
  size?: "sm" | "md" | "lg";
  emphasis?: "primary" | "secondary" | "warning" | "danger";
}

const props = defineProps({
  size: {
    type: String,
    default: "md",
  },
  emphasis: {
    type: String,
    default: "primary",
  },
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonClasses = computed(() => [
  "button",
  `button-${props.size}`,
  `button-${props.emphasis}`,
  {
    "block w-full": props.block,
    disabled: props.disabled,
  },
]);
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  @apply inline-block px-4 py-2 rounded-md text-white font-semibold;
}

.button-sm {
  @apply text-sm px-2 py-1;
}

.button-md {
  @apply text-base;
}

.button-lg {
  @apply text-lg px-5 py-3;
}

.button-primary {
  @apply bg-blue-500 hover:bg-blue-600;
}

.button-secondary {
  @apply bg-gray-500 hover:bg-gray-600;
}

.button-warning {
  @apply bg-yellow-500 hover:bg-yellow-600;
}

.button-danger {
  @apply bg-red-500 hover:bg-red-600;
}

.disabled {
  background-color: rgba(139, 147, 186, 0.6);
  @apply cursor-not-allowed;
}
.disabled:hover {
  background-color: rgba(139, 147, 186, 0.6);
}
</style>
