class RegisterPage {
  get registerTitle() {
    return cy.get('[data-cy="register-title"]');
  }

  get nameInput() {
    return cy.get('[data-cy="name-input"]');
  }

  get emailInput() {
    return cy.get('[data-cy="email-input"]');
  }

  get passwordInput() {
    return cy.get('[data-cy="password-input"]');
  }

  get confirmPasswordInput() {
    return cy.get('[data-cy="password_confirmation-input"]');
  }

  get registerButton() {
    return cy.get('[data-cy="register-button"]');
  }

  get loginLink() {
    return cy.get('[data-cy="login-link"]');
  }
}

export default RegisterPage;
