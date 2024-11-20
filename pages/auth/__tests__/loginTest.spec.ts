// @vitest-environment nuxt
import { mountSuspended, registerEndpoint } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Login from "../login.vue";
import { flushPromises } from "@vue/test-utils";
import { defineEventHandler } from "h3";

registerEndpoint(
  "/api/auth/login",
  defineEventHandler(() => ({
    url: "/api/auth/login",
    statusCode: 400,
    statusMessage: "Invalid credentials",
    message: "Invalid credentials",
  }))
);

describe("Login page tests", () => {
  it("should render the Login page", async () => {
    const page = await mountSuspended(Login);
    expect(page.html()).toContain("Login");
  });

  /*it("should create a user when the form is submitted", async () => {
    //setActivePinia(createPinia());

    const page = await mountSuspended(Login);
    const emailInput = page.find("input[id='email']");
    const passwordInput = page.find("input[id='password']");

    await emailInput.setValue("user@test.com");
    await passwordInput.setValue("password");

    await page.find("button").trigger("click");
    await flushPromises();
    expect(page.html()).toContain("Invalid credentials");
  });*/
});
