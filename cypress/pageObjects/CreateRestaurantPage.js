class CreateRestaurantPage {
  get nameInput() {
    return cy.get('[data-cy="name-input"]');
  }

  get addressInput() {
    return cy.get('[data-cy="address-input"]');
  }

  get phoneInput() {
    return cy.get('[data-cy="phone-input"]');
  }

  get emailInput() {
    return cy.get('[data-cy="email-input"]');
  }

  get tablesCountInput() {
    return cy.get('[data-cy="tables-count-input"]');
  }

  get openAtInput() {
    return cy.get('[data-cy="openHours.open-input"]');
  }

  get closeAtInput() {
    return cy.get('[data-cy="openHours.close-input"]');
  }

  get createButton() {
    return cy.get('[data-cy="create-button"]');
  }
}

export default CreateRestaurantPage;
