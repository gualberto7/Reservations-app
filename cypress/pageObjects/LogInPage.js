class LoginPage {
  get loginTitle() {
    return cy.get('[data-cy="login-title"]');
  }

  get emailInput() {
    return cy.get('[data-cy="email-input"]');
  }

  get passwordInput() {
    return cy.get('[data-cy="password-input"]');
  }

  get loginButton() {
    return cy.get('[data-cy="login-button"]');
  }

  get errorMessage() {
    return cy.get('[data-cy="error-message"]');
  }

  get registerLink() {
    return cy.get('[data-cy="register-link"]');
  }
}

export default LoginPage;
