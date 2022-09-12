/// <reference types="cypress" />

import auth from '../../fixtures/auth.json';
import experiencia from '../../fixtures/experience.json';
import formacao from '../../fixtures/formacao-academica.json';
import perfil from '../../fixtures/perfil.json';

describe('Testes de Autenticação', () => {
  let token

  beforeEach(() => {
    cy.tokenJwt().then((auth) => {
      token = auth
    })
  });


  it.only('[POST] - Autenticando na API', () => {
    cy.request({
      method: 'POST',
      url: 'api/auth',
      body: auth
      // failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      // expect(response.body.errors[0].msg).to.eq("Credenciais inválidas")
      expect(response.body).to.be.not.empty
      expect(response.body).to.have.property('jwt')
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
      console.log(response.body);
      cy.log(response.body)
      cy.getCookies('conexaoqa.herokuapp.com').should('exist')
    })
  })

  it('[GET] - Verificar Usuário Logado com variavel tempo de execução', () => {
    let token2
    cy.tokenJwt().then((auth) => {
      token2 = auth
    })
    cy.request({
      method: 'GET',
      url: 'api/auth',
      headers: {
        Cookies: token2
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(response.body)
    })
  })

  it('[GET] - Verificar Usuário Logado com variavel Global', () => {

    cy.request({
      method: 'GET',
      url: 'api/auth',
      headers: {
        Cookies: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(response.body)
    })
  })
});

describe('Testes de Profile', () => {
  let token;
  let userID;
  let experienceID;
  let educationID;
  let githubID = perfil.githubusername;

  beforeEach(() => {
    cy.tokenJwt().then((auth) => {
      token = auth
    })

  });

  it('[POST] - Adiciona perfil', () => {

    cy.request({
      method: 'POST',
      url: `api/profile`,
      headers: {
        Cookies: token
      },
      body: perfil
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
    })
  });

  it('[GET] - Buscar perfil pelo github', () => {

    cy.request({
      method: 'GET',
      url: `api/profile/github/${githubID}`,
      headers: {
        Cookies: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
    })
  });

  it('[GET] - Buscar perfil do usuario', () => {

    cy.request({
      method: 'GET',
      url: 'api/profile/me',
      headers: {
        Cookies: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      cy.log(JSON.stringify(response.body))
      userID = response.body.user._id;
      cy.log(response.body.education._id);
      console.log(response.body.education);
    })
  });

  it('[GET] - Buscar perfil do usuario por ID', () => {

    cy.request({
      method: 'GET',
      url: `api/profile/user/${userID}`,
      headers: {
        Cookies: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
    })
  });

  it('[GET] - Buscar todos perfils', () => {

    cy.request({
      method: 'GET',
      url: 'api/profile',
      headers: {
        Cookies: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
    })
  });

  it('[DELETE] - Deleta perfil do usuario', () => {

    cy.request({
      method: 'DELETE',
      url: 'api/profile',
      headers: {
        Cookies: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
    })
  });

  it('[PUT] - Adiciona expriencia no perfil do usuario', () => {

    cy.request({
      method: 'PUT',
      url: `api/profile/experience`,
      headers: {
        Cookies: token
      },
      body: experiencia
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
      experienceID = response.body.experience[0] ? response.body.experience[0]._id : '';
    })
  });

  it('[DELETE] - Deleta experiencia perfil do usuario', () => {

    cy.request({
      method: 'DELETE',
      url: `api/profile/experience/${experienceID}`,
      headers: {
        Cookies: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
    })
  });

  it.only('[PUT] - Adiciona formacao academica no perfil do usuario', () => {

    cy.request({
      method: 'PUT',
      url: `api/profile/education`,
      headers: {
        Cookies: token
      },
      body: formacao
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
      educationID = response.body.education[0]._id;
    })
  });

  it.only('[DELETE] - Deleta formacao academica perfil do usuario', () => {

    cy.request({
      method: 'DELETE',
      url: `api/profile/education/${educationID}`,
      headers: {
        Cookies: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log(response.body);
      cy.log(JSON.stringify(response.body))
    })
  });

});
