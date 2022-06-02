/// <reference types="Cypress" />

describe('Pop Up', () => {
  it('Tratando o popup diretamente', () => {
    cy.visit('https://www.wcaquino.me/cypress/frame.html')
    cy.get('#buttonPopUp').click()
    cy.on('window:alert', msg => {
      expect(msg).to.equal('Click OK!')
    })

    cy.get('#otherButton').click()
  })

  it('Deve verificar se o popup foi invocado', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    cy.window().then(win => {
      cy.stub(win,'open').as('winOpen') // por causa do stub o popup não é mais aberto, sem isso o popup abriria e não poderia ser mais controlado pelo cypress
    })
    cy.get('#buttonPopUp').click()
    cy.get('@winOpen').should('be.called')
  })
})

describe.only('Pop Up por link', () => {
  beforeEach(() =>{
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  })

  it('Checando popup URL', () => {
    cy.contains('Popup2')
      .should('have.prop', 'href')
      .and('equal', 'https://www.wcaquino.me/cypress/frame.html')
  })

  it('Checando popup com URL dinâmico', () => { // pode ser usado para um iframe tbm?
    cy.contains('Popup2').then($a =>{ // localiza o link
      const href = $a.prop('href'); // pega a propriedade href do link
      cy.visit(href) // visita a URL do link
      cy.get('#tfield').type('funciona') // digita no campo
    })
  })

  it('Deve forçar o link abrir na mesma página', () => {
    cy.contains('Popup2') // localiza o link
      .invoke('removeAttr', 'target') // remove a propriedade target do link, ao remover a propriedade target o link abre na mesma página
      .click() // clica no link
    cy.get('#tfield').type('funciona')
  })

})
