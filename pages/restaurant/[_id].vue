<script lang="ts" setup>
const nuxtApp: any = useNuxtApp();
const route = useRoute();
const restaurantStore = useRestaurantStore();
const loading = ref(true);

onMounted(async () => {
  const { data } = await nuxtApp.$fetch(`/api/restaurants/${route.params._id}`);
  restaurantStore.setRestaurant(data);
  loading.value = false;
});
</script>

<template>
  <div>
    <div v-if="loading">Loading ...</div>
    <div v-else class="w-2/3 m-auto">
      <h1 class="text-lg font-semibold mt-5">
        {{ restaurantStore.restaurant?.name }}
      </h1>
      <Tables />
    </div>
  </div>
</template>
