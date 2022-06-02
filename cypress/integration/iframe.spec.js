/// <reference types="Cypress" />

describe('Iframe', () => {
  it('Iframe', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    cy.get('#frame1').then(iframe => {
      const iframeBody = iframe.contents().find('body');
      cy.wrap(iframeBody)
        .find('#tfield')
        .type('it works')
        .should('have.value', 'it works')


        // cy.on('window:alert', msg => {
        //   expect(msg).to.equal('any msg') // alert dentro de iframe, o cypress não sabe tratar, bloquenado a execução
        // })

        // cy.wrap(iframeBody)
        //   .find('#otherButton').click()
    })
  })

  it('Tratando o Iframe como pagina principal', () => {
    cy.visit('https://www.wcaquino.me/cypress/frame.html')
      cy.get('#tfield')
        .type('it works')
        .should('have.value', 'it works')


      cy.on('window:alert', msg => {
        expect(msg).to.equal('Click OK!')
      })

      cy.get('#otherButton').click()
  })
})
