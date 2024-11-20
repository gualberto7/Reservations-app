class HomePage {
  get tableItems() {
    return cy.get('[data-cy="table-item"]');
  }

  get tableButtons() {
    return cy.get('[data-cy="table-action-button"]');
  }

  get restaurantTitle() {
    return cy.get('[data-cy="restaurant-title"]');
  }

  get restaurantCards() {
    return cy.get('[data-cy="restaurant-card"]');
  }

  get restaurantDetailLink() {
    return cy.get('[data-cy="restaurant-detail-link"]');
  }
}

export default HomePage;
