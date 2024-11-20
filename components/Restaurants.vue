<script lang="ts" setup>
import type { Restaurant } from "~/utils/interfaces/Restaurant";

const nuxtApp: any = useNuxtApp();
const restaurants = reactive<Restaurant[]>([]);

onMounted(async () => {
  const { data } = await nuxtApp.$fetch("/api/restaurants");
  restaurants.push(...data);
});
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold border-b-2" data-cy="restaurant-title">
      Restaurants
    </h1>
    <div class="grid grid-cols-3 gap-4 mt-8">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant._id"
        data-cy="restaurants-card"
      >
        <div class="bg-white p-4 rounded shadow-md">
          <h2>{{ restaurant.name }}</h2>
          <p>{{ restaurant.address }}</p>
          <router-link
            :to="`/restaurant/${restaurant._id}`"
            data-cy="restaurant-detail-link"
            >View</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
