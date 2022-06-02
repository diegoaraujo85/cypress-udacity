/// <reference types="Cypress" />

describe('Testes Dinâmicos', () => {
  before(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

  foods.forEach(food => {
    it(`Cadastro com comida variada => ${food}`, () => {
      cy.get('#formNome').type('Usuario')
      cy.get('#formSobrenome').type('Qualquer')
      cy.get(`[name=formSexo][value=F]`).click()
      cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
      cy.get('#formEscolaridade').select('Doutorado')
      cy.get('#formEsportes').select('Corrida')

      cy.get('#formCadastrar').click()
      cy.get('#resultado')
        .should('contain', 'Cadastrado!')
    });
  })

  it.only('deve selecionar todas as comidas usando o each ', () => {
    cy.get('#formNome').type('Usuario')
    cy.get('#formSobrenome').type('Qualquer')
    cy.get('[name=formSexo][value=F]').click()

    // cy.get('[name=formComidaFavorita]').click({multiple: true}) // marca todas as opções
    cy.get('[name=formComidaFavorita]').each($el => {
      if($el.val() !== 'vegetariano'){
        cy.wrap($el).click()
      }
    })

    cy.get('#formEscolaridade').select('Doutorado')
    cy.get('#formEsportes').select('Corrida')

    // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    cy.get('#formCadastrar').click()
      cy.get('#resultado').should('contain', 'Cadastrado!')
  });

});
