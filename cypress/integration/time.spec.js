/// <reference types="Cypress" />

describe('Trabalhando com tempo', () => {
  before(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  })

  it('Voltando no tempo', () => {
    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain', '27/05/2022')

    // cy.clock()
    // cy.get('#buttonNow').click()
    // cy.get('#resultado > span').should('contain', '31/12/1969')

    const dt = new Date(2012,3,10,15,23,50).getTime()
    cy.clock(dt)
    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain', '10/04/2012')
  });

  it.only('Avançar no tempo', () => {
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').should('contain', '16537') // part of passed time
    cy.get('#resultado > span').invoke('text').should('gt', 1653739688524) // gt = greater than

    cy.clock() // reseta o tempo
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').should('lte', 0) // lte = less than or equal to

    cy.tick(5000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').should('gte', 5000) // gte = greater than or equal to
  });
});
