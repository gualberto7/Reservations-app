<script lang="ts" setup>
defineEmits(["close"]);
</script>

<template>
  <div class="w-full py-2 px-4 bg-red-400 rounded">
    <div class="text-white">
      <div class="flex items-center justify-between">
        <slot></slot>
        <button
          @click="$emit('close')"
          type="button"
          class="hover:bg-red-300 py-1 px-2 rounded-full"
        >
          X
        </button>
      </div>
    </div>
  </div>
</template>
