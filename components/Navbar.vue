<script setup lang="ts">
const router = useRouter();
const userStore = useUserStore();
const restaurantStore = useRestaurantStore();
const dropdownMenu = ref(false);

const logout = () => {
  userStore.setUser(null);
  router.push("/auth/login");
};
</script>

<template>
  <nav class="w-full bg-sky-500 py-6 px-5 flex justify-between">
    <h1 class="text-white" data-cy="navbar-title">
      <div v-if="userStore.isAdmin">
        <span v-if="restaurantStore.restaurant">{{
          restaurantStore.restaurant.name
        }}</span>
        <router-link
          v-else
          to="/restaurant/create"
          data-cy="create-restaurant-link"
        >
          Create Restaurant
        </router-link>
      </div>
      <div v-else>Restaurant App</div>
    </h1>
    <ul class="flex gap-6 text-white">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
    <div>
      <!-- Dropdown options -->
      <div v-if="userStore.user">
        <div class="relative">
          <button
            @click="dropdownMenu = !dropdownMenu"
            class="text-white"
            data-cy="btn-profile-dropdown"
          >
            Welcome, {{ userStore.user?.name }}
          </button>
          <div
            v-if="dropdownMenu"
            class="absolute bg-white w-28 right-0 mt-2 p-2 rounded shadow-md flex flex-col gap-2"
          >
            <div class="py-1 px-2 hover:bg-gray-100">
              <button data-cy="btn-profile-dropdown-item">Profile</button>
            </div>
            <div class="py-1 px-2 hover:bg-gray-100">
              <button data-cy="btn-logout-dropdown-item" @click="logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
