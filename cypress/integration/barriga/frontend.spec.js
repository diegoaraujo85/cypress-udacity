/// <reference types="Cypress" />

import locators from '../../support/locators';
import '../../support/commandsContas';

describe('Testando a nivel funcional', () => {

  before(()=>{
    // interceptando as requisições para o servidor e substituindo pelo mock
    cy.server()

    cy.route({
      method: 'POST',
      url: '/signin',
      response:{
        id:1,
        nome: 'Fake user',
        token: 'fake token',
      }
    }).as('signin')

    cy.route({
      method: 'GET',
      url: '/saldo',
      response:[
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
    }).as('saldo')

    cy.login('blah', 'blah')
  })
  beforeEach(() => {
    // cy.resetApp()
    cy.get(locators.MENU.HOME).click()
  });
  after(() => {
    cy.clearLocalStorage()
  })

  it('deve criar uma conta', () => {
    cy.route({
      method: 'GET',
      url: '/contas',
      response:[
        { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1},
        { "id": 2, "nome": "banco", "visivel": true, "usuario_id": 1 },
      ],
    })
    .as('contas')

    cy.route({
      method: 'POST',
      url: '/contas',
      response: { "id": 3, "nome": "conta de teste", "visivel": true, "usuario_id": 1 }
    }).as('post_contas')

    cy.acessarMenuConta()

    cy.route({
      method: 'GET',
      url: '/contas',
      response:[
        { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1},
        { "id": 2, "nome": "banco", "visivel": true, "usuario_id": 1 },
        { "id": 3, "nome": "conta de teste", "visivel": true, "usuario_id": 1 }
      ],
    }).as('contas_novo')

    cy.inserirConta('conta de teste')

    cy.getToastMessage('Conta inserida com sucesso')
  })

  it.only('deve alterar uma conta', () => {
    cy.route({
      method: 'GET',
      url: '/contas',
      response:[
        { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1},
        { "id": 2, "nome": "banco", "visivel": true, "usuario_id": 1 },
      ],
    })
    .as('contas')

    cy.acessarMenuConta()

    cy.route({
      method: 'PUT',
      url: '/contas/**', // qualquer id
      response:[
        { "id": 1, "nome": "Carteira alterada", "visivel": true, "usuario_id": 1},
      ],
    })
    .as('contas')

    cy.route({
      method: 'GET',
      url: '/contas',
      response:[
        { "id": 1, "nome": "Carteira alterada", "visivel": true, "usuario_id": 1},
        { "id": 2, "nome": "banco", "visivel": true, "usuario_id": 1 },
      ],
    }).as('contas_novo')

    cy.alterarConta('Carteira', 'Carteira alterada')

    cy.getToastMessage('Conta atualizada com sucesso')
  })

  it('não deve criar conta com nome repetido', () => {
    // cy.acessarMenuConta()
    // cy.inserirConta('Conta mesmo nome')
    // cy.getToastMessage('status code 400')
  })

  it('deve criar uma movimentação', () => {
    // cy.get(locators.MENU.MOVIMENTACAO).click()

    // cy.get(locators.MOVIMENTACAO.DESCRICAO).type('movimentação de teste')
    // cy.get(locators.MOVIMENTACAO.VALOR).type('100')
    // cy.get(locators.MOVIMENTACAO.INTERESSADO).type('teste')
    // cy.get(locators.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    // cy.get(locators.MOVIMENTACAO.STATUS).click()
    // cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

    // cy.getToastMessage('Movimentação inserida com sucesso')

    // cy.get(locators.EXTRATO.LINHAS).should('have.length', 7) // 7 pq já há uma carga de dados inicial
    // cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO('movimentação de teste', '100')).should('exist')
  })

  it('deve excluir uma movimentação', () => {
    // cy.get(locators.MENU.EXTRATO).click()
    // cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO_PARA_DELETAR('Movimentacao para exclusao')).click()
    // cy.getToastMessage('Movimentação removida com sucesso!')
    // cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO('Movimentacao para exclusao', '1.500')).should('not.exist')
  })

  it('deve verificar o saldo', () => {
    cy.route({
      method: 'GET',
      url: '/saldo',
      response:[
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
    // cy.get(locators.MENU.EXTRATO).click()
    // cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO_PARA_EDITAR('Movimentacao 1, calculo saldo', '3.500'))
    //   .should('exist')
    //   .click()
    // cy.get(locators.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    // cy.get(locators.MOVIMENTACAO.STATUS).click()
    // cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()

    // cy.getToastMessage('Movimentação alterada com sucesso')

    // cy.get(locators.MENU.HOME).click()
    // cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
  });


});
