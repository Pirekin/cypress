Cypress.Commands.add("login", (email, senha) => {
  cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
  cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
  cy.get('[data-test="login-submit"]').click()
})
