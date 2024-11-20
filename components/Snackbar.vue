<script lang="ts" setup>
const snackbarStore = useSnackbarStore();
</script>

<template>
  <div
    v-if="snackbarStore.snackbar.show"
    class="snackbar fixed bottom-8 left-1/2 bg-slate-900 py-3 px-5 rounded shadow-lg transition-transform duration-300"
  >
    <div class="flex justify-between gap-12">
      <h3 class="text-white tracking-wider">
        {{ snackbarStore.snackbar.message }}
      </h3>
      <button class="text-blue-600 font-semibold tracking-wider">
        {{ snackbarStore.snackbar.type }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.snackbar {
  transform: translateX(-50%);
}
</style>
