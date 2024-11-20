<script lang="ts" setup>
const nuxtApp: any = useNuxtApp();
const userStore = useUserStore();
const restaurantStore = useRestaurantStore();
const router = useRouter();
const loading = ref(true);

onMounted(() => {
  getUser();
});
const getUser = async () => {
  try {
    const { data } = await nuxtApp.$fetch("/api/users/profile");
    userStore.setUser(data);
    if (data.restaurant) {
      restaurantStore.setRestaurant(data.restaurant);
    }
  } catch (error) {
    console.error(error);
    router.push("/auth/login");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="py-5 px-10">
    <div v-if="loading">Loading...</div>
    <div v-else-if="userStore.isAdmin">
      <div v-if="restaurantStore.restaurant">
        <Home />
      </div>
      <div v-else>
        <p>
          You don't have a Restaurant yet,
          <router-link to="/restaurant/create" class="text-blue-400 underline"
            >Create One</router-link
          >
        </p>
      </div>
    </div>
    <div v-else-if="userStore.user">
      <Restaurants />
    </div>
  </div>
</template>
