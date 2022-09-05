/// <reference types="cypress" />

import usuarios from "../../fixtures/usuarios.json";

describe('Criar Perfil', () => {

  beforeEach(() => {

    cy.visit('login');
    cy.login(usuarios.jr);

    cy.get('[data-test="dashboard-addExperience"]')
      .should('be.visible')
      .click();
  });

  it('Adicionar Expreriência com Sucesso', () => {

    //Campo Posicao
    cy.get('[data-test="experience-title"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('Analista de Seguros');

    //Campo Empresa
    cy.get('[data-test="experience-company"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('Maritima Seguros');

    //Campo Inicio
    cy.get('#from')
      .type('21/06/2010');

    // Atual
    cy.get('[name="current"]')
      .check();

    // Adicionar Experiencia
    cy.get('[data-test="experience-submit"]')
      .click();

    cy.get('[data-test="alert"]')
      .should('be.visible')
      .and('contain', 'Experiência Adicionada');

  });

  it('Erro ao clicar em adicionar experiência sem preencher campos obrigatórios', () => {

    // Adicionar Experiencia
    cy.get('[data-test="experience-submit"]')
      .click();

    // //Validar error
    const classErrorStatus = cy.get('[data-test="experience-title"] > .MuiFormHelperText-root');
    expect(classErrorStatus).to.exist;

    const classErrorConhecimentos = cy.get('[data-test="experience-company"] > .MuiFormHelperText-root')
    expect(classErrorConhecimentos).to.exist;
  });

});
