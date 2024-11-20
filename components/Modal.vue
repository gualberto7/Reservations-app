<script lang="ts" setup>
const modalStore = useModalStore();
</script>

<template>
  <div v-if="modalStore.modal.show" class="modal">
    <div class="modal-content">
      <component :is="modalStore.modal.component" :arg="modalStore.modal.arg" />
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 570px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
}

.modal-title {
  text-align: center;
  margin-bottom: 20px;
}
.modal-title h1 {
  font-size: 1.5rem;
}
.modal-body {
  margin-bottom: 20px;
}
.modal-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
