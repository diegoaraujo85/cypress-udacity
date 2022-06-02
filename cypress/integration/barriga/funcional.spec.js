/// <reference types="Cypress" />

import locators from '../../support/locators';
import '../../support/commandsContas';

describe('Testando a nivel funcional', () => {

  before(()=>{
    cy.login(Cypress.env('email'), Cypress.env('password'))
  })
  beforeEach(() => {
    cy.resetApp()
    cy.get(locators.MENU.HOME).click()
  });

  it('deve criar uma conta', () => {
    // cy.get(locators.MENU.SETTINGS).click()
    // cy.get(locators.MENU.CONTAS).click()

    cy.acessarMenuConta()

    // cy.get(locators.CONTAS.NOME).type('conta de teste')
    // cy.get(locators.CONTAS.BTN_SALVAR).click()
    cy.inserirConta('conta de teste')

    // cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso')
    cy.getToastMessage('Conta inserida com sucesso')
  })

  it('deve alterar uma conta', () => {
    // cy.get(locators.MENU.SETTINGS).click()
    // cy.get(locators.MENU.CONTAS).click()
    cy.acessarMenuConta()

    // cy.xpath(locators.CONTAS.FN_XP_BTN_ALTERAR('conta de teste')).click()
    // cy.get(locators.CONTAS.NOME)
    //   .clear()
    //   .type(ContaParaAlterar)
    // cy.get(locators.CONTAS.BTN_SALVAR).click()
    cy.alterarConta('Conta para alterar', 'conta alterada')

    // cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    cy.getToastMessage('Conta atualizada com sucesso')
  })

  it('não deve criar conta com nome repetido', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta mesmo nome')
    cy.getToastMessage('status code 400')
  })

  it('deve criar uma movimentação', () => {
    cy.get(locators.MENU.MOVIMENTACAO).click()

    cy.get(locators.MOVIMENTACAO.DESCRICAO).type('movimentação de teste')
    cy.get(locators.MOVIMENTACAO.VALOR).type('100')
    cy.get(locators.MOVIMENTACAO.INTERESSADO).type('teste')
    cy.get(locators.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    cy.get(locators.MOVIMENTACAO.STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

    // cy.get(locators.MESSAGE).should('contain', 'Movimentação inserida com sucesso')
    cy.getToastMessage('Movimentação inserida com sucesso')

    cy.get(locators.EXTRATO.LINHAS).should('have.length', 7) // 7 pq já há uma carga de dados inicial
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO('movimentação de teste', '100')).should('exist')
  })

  it('deve excluir uma movimentação', () => {
    cy.get(locators.MENU.EXTRATO).click()
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO_PARA_DELETAR('Movimentacao para exclusao')).click()
    cy.getToastMessage('Movimentação removida com sucesso!')
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO('Movimentacao para exclusao', '1.500')).should('not.exist')
  })

  it('deve verificar o saldo', () => {
    cy.get(locators.MENU.HOME).click()
    cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
  });

  it.only('deve alterar uma movimentação e verificar o saldo', () => {
    cy.get(locators.MENU.EXTRATO).click()
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO_PARA_EDITAR('Movimentacao 1, calculo saldo', '3.500'))
      .should('exist')
      .click()
    // cy.wait(1000)
    cy.get(locators.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(locators.MOVIMENTACAO.STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

    cy.getToastMessage('Movimentação alterada com sucesso')

    cy.get(locators.MENU.HOME).click()
    cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
  });


});
