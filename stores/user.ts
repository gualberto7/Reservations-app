import { type User, USER_ROLES } from "~/utils/interfaces/User";

export const useUserStore = defineStore("user", () => {
  // State ----
  const user = ref<User | null>(null);

  // Actions ----
  const setUser = (newUser: User | null, token?: string) => {
    if (!newUser) {
      user.value = null;
      localStorage.removeItem("token");
      return;
    }
    user.value = newUser;
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  // Getters ----
  const getUser = computed(() => user.value);
  const isAdmin = computed(() => user.value?.roles.includes(USER_ROLES.ADMIN));

  return {
    // getters
    user: getUser,
    isAdmin,

    // actions
    setUser,
  };
});
