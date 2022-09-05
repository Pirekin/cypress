Cypress.Commands.add("login", (usuario) => {
  cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(usuario.email)
  cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(usuario.senha)
  cy.get('[data-test="login-submit"]').click()
})
