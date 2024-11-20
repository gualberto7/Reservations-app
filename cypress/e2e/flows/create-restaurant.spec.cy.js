import AppTest from "../../pageObjects/AppTest";

describe("Create restaurant flow", () => {
  beforeEach(() => {
    cy.task("db:cleanup");
    cy.task("db:seed-users");
  });

  it("should display error message when credentials are incorrect", async () => {
    cy.visit("/");

    // Verify the user is redirected to the login page
    cy.url().should("include", "/auth/login");

    // Login with admin credentials
    AppTest.loginPage.emailInput.type("admin@test.com");
    AppTest.loginPage.passwordInput.type("password123");
    AppTest.loginPage.loginButton.click();

    AppTest.navbarPage.navbarTitle.should("contain", "Create Restaurant");
    AppTest.navbarPage.profileDropdown.should("contain", "Welcome, Admin");

    AppTest.navbarPage.createRestaurantLink.click();
    cy.url().should("include", "/restaurant/create");

    AppTest.createRestaurantPage.nameInput.type("Restaurant 1");
    AppTest.createRestaurantPage.addressInput.type("August 6 Avenue");
    AppTest.createRestaurantPage.phoneInput.type("78659834");
    AppTest.createRestaurantPage.tablesCountInput.type("5");
    AppTest.createRestaurantPage.emailInput.type("restaurant1@test.com");
    AppTest.createRestaurantPage.openAtInput.type("11:00");
    AppTest.createRestaurantPage.closeAtInput.type("14:00");

    AppTest.createRestaurantPage.createButton.click();
    AppTest.homePage.tableItems.should("have.length", 5);
  });
});
