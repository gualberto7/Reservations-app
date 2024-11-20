import AppTest from "../../pageObjects/AppTest";

describe("Auth flow", () => {
  beforeEach(() => {
    cy.task("db:cleanup");
  });

  it("should display error message when credentials are incorrect", async () => {
    cy.visit("/auth/login");

    // Verify invalid credential error message
    cy.get('[data-cy="email-input"]').type("admin-user@test.com");
    AppTest.loginPage.passwordInput.type("invalid-password");
    AppTest.loginPage.loginButton.click();

    AppTest.loginPage.errorMessage.should("contain", "Invalid credentials");

    // Verify redirect to register page
    AppTest.loginPage.registerLink.click();
    AppTest.registerPage.registerTitle.should("contain", "Register");

    // Verify register page
    AppTest.registerPage.nameInput.type("Admin");
    AppTest.registerPage.emailInput.type("admin@test.com");
    AppTest.registerPage.passwordInput.type("admin-password");
    AppTest.registerPage.confirmPasswordInput.type("admin-password");
    AppTest.registerPage.registerButton.click();

    AppTest.navbarPage.navbarTitle.should("contain", "Restaurant App");
    AppTest.navbarPage.profileDropdown.should("contain", "Welcome, Admin");

    // Verify logout
    AppTest.navbarPage.profileDropdown.click();
    AppTest.navbarPage.logoutDropdownItem.click();
    cy.url().should("include", "/auth/login");
    AppTest.loginPage.loginTitle.should("contain", "Login");

    // Verify login page
    AppTest.loginPage.emailInput.type("admin@test.com");
    AppTest.loginPage.passwordInput.type("admin-password");
    AppTest.loginPage.loginButton.click();

    AppTest.navbarPage.navbarTitle.should("contain", "Restaurant App");
    AppTest.navbarPage.profileDropdown.should("contain", "Welcome, Admin");
  });
});
