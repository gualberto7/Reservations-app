<script setup lang="ts">
import { ref } from "vue";
interface TabInterface {
  id: string;
  title: string;
}

defineProps({
  tabs: {
    type: Array as () => TabInterface[],
    required: true,
  },
});

const activeTab = ref(0);
</script>

<template>
  <div class="tabs py-2 px-4">
    <div class="tabs-header flex gap-4 mb-7 border-b border-gray-200">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="bg-gray-200 py-3 px-12 rounded-t-md"
        :class="{
          'bg-rose-400 text-white': activeTab === index,
        }"
        @click="activeTab = index"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs-content">
      <slot :name="tabs[activeTab].id"></slot>
    </div>
  </div>
</template>
