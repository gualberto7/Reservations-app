<script lang="ts" setup>
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

defineEmits(["onSubmit"]);

provide("form", props.form);
</script>

<template>
  <form @submit.prevent="$emit('onSubmit')">
    <slot></slot>
  </form>
</template>
