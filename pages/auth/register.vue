<script setup lang="ts">
import RegisterForm from "~/utils/classes/auth/RegisterForm";

definePageMeta({
  layout: "auth",
});

const form = new RegisterForm();
</script>

<template>
  <div class="w-full sm:w-1/3 md:w-1/2">
    <card>
      <div class="card-body">
        <h1 data-cy="register-title" class="text-2xl font-bold mb-4">
          Register
        </h1>
        <Form :form="form" @on-submit="form.submit()">
          <div class="mb-4">
            <FieldContainer field="name">
              <Label />
              <Input />
            </FieldContainer>
          </div>
          <div class="mb-4">
            <FieldContainer field="phone">
              <Label />
              <Input />
            </FieldContainer>
          </div>
          <div class="mb-4">
            <FieldContainer field="email">
              <Label />
              <Input type="email" />
            </FieldContainer>
          </div>
          <div class="mb-4">
            <FieldContainer field="password">
              <Label />
              <Input type="password" />
            </FieldContainer>
          </div>
          <div class="mb-4">
            <FieldContainer field="password_confirmation">
              <Label />
              <Input type="password" />
            </FieldContainer>
          </div>
          <div class="mb-4">
            <Button
              block
              data-cy="register-button"
              :disabled="form.processing.value"
            >
              Register
            </Button>
          </div>
        </Form>
        <p>
          Already have an account?
          <NuxtLink to="/auth/login" data-cy="login-link">log in</NuxtLink>
        </p>
      </div>
    </card>
  </div>
</template>
