class ReservationModal {
  get formTitle() {
    return cy.get('[data-cy="reservation-modal-title"]');
  }

  get nameInput() {
    return cy.get('[data-cy="name-input"]');
  }

  get phoneInput() {
    return cy.get('[data-cy="phone-input"]');
  }

  get saveButton() {
    return cy.get('[data-cy="save-button"]');
  }

  get cancelButton() {
    return cy.get('[data-cy="cancel-button"]');
  }
}

export default ReservationModal;
