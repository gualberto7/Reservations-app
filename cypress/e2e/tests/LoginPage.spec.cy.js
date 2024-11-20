import AppTest from "../../pageObjects/AppTest";

describe("Login page test", () => {
  it("should display error message when credentials are incorrect", () => {
    cy.visit("/");
    AppTest.loginPage.emailInput.type("mario@test.com");
    AppTest.loginPage.passwordInput.type("invalid-password");
    AppTest.loginPage.loginButton.click();

    AppTest.loginPage.errorMessage.should("contain", "Invalid credentials");
  });
});
