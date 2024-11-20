// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Register from "../register.vue";

describe("Register page tests", () => {
  it("should render the register page", async () => {
    const page = await mountSuspended(Register);
    expect(page.html()).toContain("Register");
  });

  /*it("should create a user when the form is submitted", async () => {
      setActivePinia(createPinia());

      const page = await mountSuspended(Register);
      const nameInput = page.find("input[id='name']");
      const emailInput = page.find("input[id='email']");
      const passwordInput = page.find("input[id='password']");
      const passwordConfirmationInput = page.find(
        "input[id='password_confirmation']"
      );

      await nameInput.setValue("User");
      await emailInput.setValue("user@test.com");
      await passwordInput.setValue("password");
      await passwordConfirmationInput.setValue("password");

      await page.find("button").trigger("click");
      await page.vm.$nextTick();
      expect(page.html()).toContain("Welcome, User");
    });*/

  describe("Form validation", () => {
    it("Name should be required", async () => {
      const page = await mountSuspended(Register);
      const nameInput = page.find("input[id='name']");
      await nameInput.setValue("User");
      await nameInput.setValue("");
      await nameInput.trigger("blur");
      expect(page.find("span[id='name-error']").text()).toBe(
        "This field is required"
      );
    });

    it("Name should have at least 3 characters", async () => {
      const page = await mountSuspended(Register);
      const nameInput = page.find("input[id='name']");
      await nameInput.setValue("Us");
      await nameInput.trigger("blur");
      expect(page.find("span[id='name-error']").text()).toBe(
        "This field must have at least 3 characters"
      );
    });

    it("Email should be required", async () => {
      const page = await mountSuspended(Register);
      const emailInput = page.find("input[id='email']");
      await emailInput.setValue("email@test.com");
      await emailInput.setValue("");
      await emailInput.trigger("blur");
      expect(page.find("span[id='email-error']").text()).toBe(
        "This field is required"
      );
    });

    it("Email should be a valid email", async () => {
      const page = await mountSuspended(Register);
      const emailInput = page.find("input[id='email']");
      await emailInput.setValue("email");
      await emailInput.trigger("blur");
      expect(page.find("span[id='email-error']").text()).toBe(
        "This field must be a valid email"
      );
    });

    it("Password should be required", async () => {
      const page = await mountSuspended(Register);
      const passwordInput = page.find("input[id='password']");
      await passwordInput.setValue("password");
      await passwordInput.setValue("");
      await passwordInput.trigger("blur");
      expect(page.find("span[id='password-error']").text()).toBe(
        "This field is required"
      );
    });

    it("Password should have at least 6 characters", async () => {
      const page = await mountSuspended(Register);
      const passwordInput = page.find("input[id='password']");
      await passwordInput.setValue("pass");
      await passwordInput.trigger("blur");
      expect(page.find("span[id='password-error']").text()).toBe(
        "This field must have at least 6 characters"
      );
    });

    it("Password confirmation should match password", async () => {
      const page = await mountSuspended(Register);
      const passwordInput = page.find("input[id='password']");
      const passwordConfirmationInput = page.find(
        "input[id='password_confirmation']"
      );
      await passwordInput.setValue("password");
      await passwordConfirmationInput.setValue("password123");
      await passwordConfirmationInput.trigger("blur");
      expect(page.find("span[id='password_confirmation-error']").text()).toBe(
        "This field must match"
      );
    });
  });
});
