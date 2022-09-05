/// <reference types="cypress" />

import usuarios from "../../fixtures/usuarios.json";

describe('Criar Perfil', () => {

  beforeEach(() => {

    cy.visit('login');
    cy.login(usuarios.jr);

    cy.get('[href="/adicionar-formacao"]')
      .should('be.visible')
      .click();
  });

  it('Adicionar Formação Acadêmica com Sucesso', () => {

    //Campo Escola
    cy.get('[data-test="education-school"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('SENAC');

    //Campo Grau
    cy.get('[data-test="education-degree"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('Tecnico');

    //Campo Curso
    cy.get('[data-test="education-fieldOfStudy"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('Analista de Seguros');

    //Campo Inicio
    cy.get('#from')
      .type('21/06/2010');

    // Cursando
    cy.get('[name="current"]')
      .check();

    // Adicionar Experiencia
    cy.get('[data-test="education-submit"]')
      .click();

    cy.get('[data-test="alert"]')
      .should('be.visible')
      .and('contain', 'Formação Acadêmica Adicionada');
  });

  it('Erro ao clicar em adicionar formação acadêmica sem preencher campos obrigatórios', () => {

    // Adicionar Experiencia
    cy.get('[data-test="education-submit"]')
      .click();

    // //Validar error
    const classErrorStatus = cy.get('[data-test="education-school"] > .MuiFormHelperText-root')
    expect(classErrorStatus).to.exist;

    const classErrorConhecimentos = cy.get('[data-test="education-degree"] > .MuiFormHelperText-root')
    expect(classErrorConhecimentos).to.exist;
  });

});
