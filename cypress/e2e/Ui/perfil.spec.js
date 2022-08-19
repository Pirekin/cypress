/// <reference types="cypress" />

describe('Criar Perfil', () => {

  beforeEach(() => {
    cy.visit('login');
    cy.login('godualdo.junior-ext@viavarejo.com.br', '12345678');
    cy.get('[data-test="dashboard-createProfile"]')
      .should('be.visible')
      .click();
  });

  it.only('Criar perfil com Sucesso', () => {

    //Campo Status
    cy.get('#mui-component-select-status')
      .click();

    cy.get('.MuiList-root')
      .should('be.visible');

    cy.get('[data-test="status-10"]')
      .click();

    cy.get('.MuiSelect-nativeInput')
      .should('not.have.value', '');

    //Campo Conhecimentos
    cy.get('[data-test="profile-skills"]')
      .type('Cypress, Testes Manuais');

    cy.get('[data-test="profile-skills"] > div > input')
      .should('have.value', 'Cypress, Testes Manuais');

    //Criar Perfil
    cy.get('[data-test="profile-submit"]')
      .click();

    cy.get('[data-test="alert"]')
      .should('be.visible')
      .and('contain', 'Perfil Criado');

  });

  it('Erro ao clicar em criar perfil sem preencher campos obrigatórios', () => {

    //Criar Perfil
    cy.get('[data-test="profile-submit"]')
      .click();

    //Validar error
    const classErrorStatus = cy.get('#status > .Mui-error');
    expect(classErrorStatus).to.exist;

    const classErrorConhecimentos = cy.get('[data-test="profile-skills"] > label > .Mui-error');
    expect(classErrorConhecimentos).to.exist;
  });

});
