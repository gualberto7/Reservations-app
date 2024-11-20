import AppTest from "../../pageObjects/AppTest";

describe("Create / update reservations flow", () => {
  beforeEach(() => {
    cy.task("db:cleanup");
    cy.task("db:seed-reservations");
  });

  it("should display error message when credentials are incorrect", async () => {
    cy.visit("/");

    // Verify the user is redirected to the login page
    cy.url().should("include", "/auth/login");

    // Login with admin credentials
    AppTest.loginPage.emailInput.type("admin@test.com");
    AppTest.loginPage.passwordInput.type("password123");
    AppTest.loginPage.loginButton.click();

    // Verify total tables, occupied tables, and available tables
    AppTest.homePage.tableItems.should("have.length", 8);
    AppTest.homePage.tableItems
      .filter(':contains("Occupied")')
      .should("have.length", 2);
    AppTest.homePage.tableItems
      .filter(':contains("Available")')
      .should("have.length", 6);

    // Verify create reservation
    AppTest.homePage.tableItems
      .filter(':contains("Available")')
      .first()
      .find('[data-cy="table-action-button"]')
      .click();

    // Check if the modal in opened and the form is displayed
    AppTest.reservationModal.formTitle.should("contain", "Reservation Form");

    // Create reservation
    AppTest.reservationModal.nameInput.type("Customer name");
    AppTest.reservationModal.phoneInput.type("78669442");
    AppTest.reservationModal.saveButton.click();

    AppTest.homePage.tableItems
      .filter(':contains("Occupied")')
      .should("have.length", 3);

    // Request a reservation as a customer
    AppTest.navbarPage.profileDropdown.click();
    AppTest.navbarPage.logoutDropdownItem.click();
    cy.url().should("include", "/auth/login");

    // Login with customer credentials
    AppTest.loginPage.emailInput.type("customer@test.com");
    AppTest.loginPage.passwordInput.type("password123");
    AppTest.loginPage.loginButton.click();

    // Check first restaurant detail
    AppTest.homePage.restaurantTitle.should("contain", "Restaurants");
    AppTest.homePage.restaurantDetailLink.first().click();

    // Send reservation request
    AppTest.homePage.tableItems
      .filter(':contains("Available")')
      .first()
      .find('[data-cy="table-action-button"]')
      .click();

    // AppTest.reservationModal.nameInput.type("Customer name"); PRE-POPULATED
    AppTest.reservationModal.phoneInput.type("78669442");
    AppTest.reservationModal.saveButton.click();

    AppTest.homePage.tableItems
      .filter(':contains("Requested")')
      .should("have.length", 1);

    AppTest.homePage.tableItems
      .filter(':contains("Occupied")')
      .should("have.length", 3);

    AppTest.homePage.tableItems
      .filter(':contains("Available")')
      .should("have.length", 4);
  });
});
