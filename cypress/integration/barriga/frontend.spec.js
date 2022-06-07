/// <reference types="Cypress" />

import locators from '../../support/locators';
import '../../support/commandsContas';
import buildEnv from '../../support/buildEnv';

describe('Testando a nivel funcional', () => {

  beforeEach(() => {
    buildEnv()

    cy.login('blah', 'blah')
    // cy.resetApp()
    cy.get(locators.MENU.HOME).click()
  });

  after(() => {
    cy.clearLocalStorage()
  })

  it('deve criar uma conta', () => {
    cy.route({
      method: 'POST',
      url: '/contas',
      response: { "id": 3, "nome": "conta de teste", "visivel": true, "usuario_id": 1 }
    }).as('post_contas')

    cy.acessarMenuConta()

    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
        { "id": 2, "nome": "banco", "visivel": true, "usuario_id": 1 },
        { "id": 3, "nome": "conta de teste", "visivel": true, "usuario_id": 1 }
      ],
    }).as('contas_novo')

    cy.inserirConta('conta de teste')

    cy.getToastMessage('Conta inserida com sucesso')
  })

  it('deve alterar uma conta', () => {
    cy.acessarMenuConta()

    cy.route({
      method: 'PUT',
      url: '/contas/**', // qualquer id
      response: [
        { "id": 1, "nome": "Carteira alterada", "visivel": true, "usuario_id": 1 },
      ],
    })
      .as('contas')

    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        { "id": 1, "nome": "Carteira alterada", "visivel": true, "usuario_id": 1 },
        { "id": 2, "nome": "banco", "visivel": true, "usuario_id": 1 },
      ],
    }).as('contas_novo')

    cy.alterarConta('Carteira', 'Carteira alterada')

    cy.getToastMessage('Conta atualizada com sucesso')
  })

  it('não deve criar conta com nome repetido', () => {
    cy.acessarMenuConta()

    cy.route({
      method: 'POST',
      url: '/contas',
      response: { "error": "Já existe uma conta com esse nome!" },
      status: 400,
    }).as('post_contas_mesmo_nome')

    cy.inserirConta('Carteira')
    cy.getToastMessage('status code 400')
  })

  it('deve criar uma movimentação', () => {
    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: {
        "id": 1,
        "descricao": "movimentação de teste",
        "envolvido": "CCC",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2022-06-06T03:00:00.000Z",
        "data_pagamento": "2022-06-06T03:00:00.000Z",
        "valor": "123.00",
        "status": true,
        "conta_id": 2,
        "usuario_id": 1,
        "transferencia_id": null,
        "parcelamento_id": null
      }
    }).as('transacoes')

    cy.route({
      method: 'GET',
      url: '/extrato/**',
      response: 'fixture:movimentacaoSalva',
    })

    cy.get(locators.MENU.MOVIMENTACAO).click()

    cy.get(locators.MOVIMENTACAO.DESCRICAO).type('movimentação de teste')
    cy.get(locators.MOVIMENTACAO.VALOR).type('100')
    cy.get(locators.MOVIMENTACAO.INTERESSADO).type('teste')
    cy.get(locators.MOVIMENTACAO.CONTA).select('banco')
    cy.get(locators.MOVIMENTACAO.STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

    cy.getToastMessage('Movimentação inserida com sucesso')

    cy.get(locators.EXTRATO.LINHAS).should('have.length', 7)
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO('movimentação de teste', '100')).should('exist')
  })

  it('deve excluir uma movimentação', () => {
    cy.route({
      method: 'DELETE',
      url: '/transacoes/**', // ** = qualquer id
      response: {},
      status: 204,
    })
    cy.get(locators.MENU.EXTRATO).click()
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO_PARA_DELETAR('Movimentacao para exclusao')).click()
    // cy.route({
    //   method: 'GET',
    //   url: '/extrato/**',
    //   response: {},
    // })
    cy.getToastMessage('Movimentação removida com sucesso!')
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO('Movimentacao para exclusao', '1.500')).not('exist')
  })

  it('deve verificar o saldo', () => {
    cy.route({
      method: 'GET',
      url: '/saldo',
      response: [
        {
          "conta_id": 999,
          "conta": "Carteira",
          "saldo": "100.00"
        },
        {
          "conta_id": 999,
          "conta": "Banco",
          "saldo": "100000.00"
        },
      ],
    })

    cy.get(locators.MENU.HOME).click()
    cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')
  });

  it('deve alterar uma movimentação e verificar o saldo', () => {
    cy.route({
      method: 'PUT',
      url: '/transacoes/**', // ** = qualquer id
      response:
      {
        "id": 1144129,
        "descricao": "Movimentacao 1, calculo saldo",
        "envolvido": "CCC",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2022-06-07T03:00:00.000Z",
        "data_pagamento": "2022-06-07T03:00:00.000Z",
        "valor": "3500.00",
        "status": true,
        "conta_id": 1227339,
        "usuario_id": 30622,
        "transferencia_id": null,
        "parcelamento_id": null
      }
    })

    cy.route({
      method: 'GET',
      url: '/transacoes/**', // ** = qualquer id
      response:
      {
        "conta": "Conta para saldo",
        "id": 1144129,
        "descricao": "Movimentacao 1, calculo saldo",
        "envolvido": "CCC",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2022-06-07T03:00:00.000Z",
        "data_pagamento": "2022-06-07T03:00:00.000Z",
        "valor": "3500.00",
        "status": false,
        "conta_id": 1227339,
        "usuario_id": 30622,
        "transferencia_id": null,
        "parcelamento_id": null
      },
    })

    cy.get(locators.MENU.EXTRATO).click()
    cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO_PARA_EDITAR('Movimentacao 1, calculo saldo', '3.500'))
      .should('exist')
      .click()
    cy.get(locators.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(locators.MOVIMENTACAO.STATUS).click()
    cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

    cy.getToastMessage('Movimentação alterada com sucesso')

    cy.route({
      method: 'GET',
      url: '/saldo',
      response: [
        {
          "conta_id": 999,
          "conta": "Carteira",
          "saldo": "4034.00"
        },
        {
          "conta_id": 999,
          "conta": "Banco",
          "saldo": "100000.00"
        },
      ],
    }).as('saldo_final')

    cy.get(locators.MENU.HOME).click()
    cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
  });


})
