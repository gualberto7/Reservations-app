class NavbarPage {
  get navbarTitle() {
    return cy.get('[data-cy="navbar-title"]');
  }

  get profileDropdown() {
    return cy.get('[data-cy="btn-profile-dropdown"]');
  }

  get logoutDropdownItem() {
    return cy.get('[data-cy="btn-logout-dropdown-item"]');
  }

  get createRestaurantLink() {
    return cy.get('[data-cy="create-restaurant-link"]');
  }
}

export default NavbarPage;
