export const useAuth = () => {
  const router = useRouter();
  const userStore = useUserStore();
  const errorMessage = ref("");

  const login = async (form: object) => {
    try {
      const { data } = await $fetch("/api/auth/login", {
        method: "post",
        body: form,
      });
      userStore.setUser(data.user, data.token);
      router.push("/");
    } catch (error: any) {
      errorMessage.value = error.statusMessage;
    }
  };

  const register = async (form: object) => {
    try {
      const { data } = await $fetch("/api/auth/register", {
        method: "post",
        body: form,
      });
      userStore.setUser(data.user, data.token);
      router.push("/");
    } catch (error: any) {
      errorMessage.value = error.statusMessage;
    }
  };

  return { login, register, errorMessage };
};
