import type { Restaurant } from "~/utils/interfaces/Restaurant";

export const useRestaurantStore = defineStore("restaurant", () => {
  // State ----
  const restaurant = ref<Restaurant | null>(null);

  // Actions ----
  const setRestaurant = (newRestaurant: Restaurant | null) => {
    restaurant.value = newRestaurant;
  };

  // Getters ----
  const getRestaurant = computed(() => restaurant.value);

  return {
    // getters
    restaurant: getRestaurant,

    // actions
    setRestaurant,
  };
});
