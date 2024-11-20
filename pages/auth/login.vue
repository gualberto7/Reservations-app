<script setup lang="ts">
import { required, email } from "~/utils/helpers/validations";

definePageMeta({
  layout: "auth",
});

const { setUser } = useUserStore();
const router = useRouter();
const errorMessage = ref("");
const form = reactive({
  email: "",
  password: "",
});

const login = async (form: object) => {
  try {
    const { data } = await $fetch("/api/auth/login", {
      method: "post",
      body: form,
    });
    setUser(data.user, data.token);
    router.push("/");
  } catch (error: any) {
    errorMessage.value = error.statusMessage;
  }
};

// Form validation rules
const emailRules = computed(() => {
  return [required(form.email), email(form.email)];
});
const passwordRules = computed(() => {
  return [required(form.password)];
});
</script>

<template>
  <div class="w-full sm:w-1/3 md:w-1/2">
    <card>
      <div class="card-body">
        <h1 data-cy="login-title" class="text-2xl font-bold mb-4">Login</h1>
        <form @submit.prevent="login(form)">
          <div class="mb-4" v-if="errorMessage">
            <Alert @close="errorMessage = ''" data-cy="error-message">{{
              errorMessage
            }}</Alert>
          </div>
          <div class="mb-4">
            <TextField
              type="email"
              id="email"
              name="email"
              label="Email"
              v-model="form.email"
              :rules="emailRules"
              data-cy="email-input"
              required
            />
          </div>
          <div class="mb-4">
            <TextField
              type="password"
              id="password"
              name="password"
              label="Password"
              v-model="form.password"
              :rules="passwordRules"
              data-cy="password-input"
              required
            />
          </div>
          <div class="mb-4">
            <Button block data-cy="login-button">Log In</Button>
          </div>
        </form>
        <p>
          Not account yet?
          <NuxtLink to="/auth/register" data-cy="register-link">
            register
          </NuxtLink>
        </p>
      </div>
    </card>
  </div>
</template>
