/// <reference types="Cypress" />

// jquery selectors: https://www.w3schools.com/jquery/jquery_ref_selectors.asp
// xpath reference: http://www.cheat-sheets.org/saved-copy/Locators_table_1_0_2.pdf

describe('Name of the group', () => {
  before(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {
    cy.reload()
  })

  it('usando jquery selectors ', () => {
    cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
    cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
    cy.get('[onClick*=Francisco]')

    cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
    cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input")
  });

  it('usando xpath', () => {
    cy.xpath('//table[@id=\'tabelaUsuarios\']//td[text()=\'Doutorado\']/../td[6]/input')
    cy.xpath('//input[contains(@onclick,\'Francisco\')]')
    cy.xpath("//table[@id=\'tabelaUsuarios\']//td[contains(.,'Francisco')]/..//input[@type='text']")
    cy.xpath("//td[contains(.,'Usuario A')]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']").type('usando xpath')
  })
});
