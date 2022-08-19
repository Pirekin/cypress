/// <reference types="cypress" />

describe('Funcionalidade Cadastro', () => {

  beforeEach(() => {
    cy.visit('cadastrar')
  });

  it('Cadastro com Sucesso', () => {

    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type('Teste Jr');
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('godualdo.junior-ext@viavarejo.com.br');
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('12345678');
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('12345678');
    cy.get('[data-test="register-submit"]').click();

    cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo');

  });

});
