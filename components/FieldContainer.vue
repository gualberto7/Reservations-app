<script lang="ts" setup>
const props = defineProps({
  field: {
    type: String,
    required: true,
  },
});

provide("field", props.field);
</script>

<template>
  <slot></slot>
</template>
