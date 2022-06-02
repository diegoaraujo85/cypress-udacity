import locators from '../support/locators';

Cypress.Commands.add('acessarMenuConta', () => {
  cy.get(locators.MENU.SETTINGS).click()
  cy.get(locators.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta',(conta)=>{
  cy.get(locators.CONTAS.NOME)
    .type(conta)

  cy.get(locators.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('alterarConta',(contaAntiga, contaNova)=>{
  cy.xpath(locators.CONTAS.FN_XP_BTN_ALTERAR(contaAntiga)).click()

  cy.get(locators.CONTAS.NOME)
    .clear()
    .type(contaNova)

  cy.get(locators.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('getToastMessage', (message) => {
  cy.get(locators.MESSAGE).should('contain', message)
})
