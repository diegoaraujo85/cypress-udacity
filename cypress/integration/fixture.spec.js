/// <reference types="Cypress" />

describe('Usando fixtures', () => {
  it.only('pegando dados de um arquivo fixture', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    cy.fixture('userData').as('usuario').then((userData) => {
      cy.get('#formNome').type(userData.nome)
      cy.get('#formSobrenome').type(userData.sobrenome)
      cy.get(`[name=formSexo][value=${userData.sexo}]`).click()
      cy.get(`[name=formComidaFavorita][value=${userData.comida}]`).click()
      cy.get('#formEscolaridade').select(userData.escolaridade)
      cy.get('#formEsportes').select(userData.esportes)

      cy.get('#formCadastrar').click()
      cy.get('#resultado')
        .should('contain', 'Cadastrado!')
    })
  });
});
