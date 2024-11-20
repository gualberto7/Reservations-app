import AppTest from "../../pageObjects/AppTest";

describe("Register page test", () => {
  beforeEach(() => {
    cy.visit("/auth/register");
  });

  it("should create a new user successfully", () => {
    AppTest.registerPage.nameInput.type("John Doe");
    AppTest.registerPage.emailInput.type("john1@test.com");
    AppTest.registerPage.passwordInput.type("password");
    AppTest.registerPage.confirmPasswordInput.type("password");
    AppTest.registerPage.registerButton.click();

    // Check if the user is redirected to the home page
    cy.url().should("include", "/");
  });
});
