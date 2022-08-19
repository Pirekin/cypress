/// <reference types="cypress" />

describe('Funcionalidade Login', () => {

  it('Login com Sucesso', () => {

    cy.visit('login')

    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type('godualdo.junior-ext@viavarejo.com.br');
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type('12345678');
    cy.get('[data-test="login-submit"]').click();

    cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo');

  });

});
