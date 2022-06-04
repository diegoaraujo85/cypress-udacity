/// <reference types="Cypress" />

describe('Testando a nivel de api', () => {

  before(()=>{
    cy.getToken(Cypress.env('email'), Cypress.env('password'))
  })
  beforeEach(() => {
    cy.resetRest()
  });

  it('deve criar uma conta', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      body: {
        nome: 'conta via rest',
      },
      headers:{
        Authorization: `JWT ${Cypress.env('token')}`
      },
    })
    .as('response')
    // apenas uma forma diferente de fazer o then
    cy.get('@response')
    .then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.nome).to.eq('conta via rest')
    })
  })

  it('deve alterar uma conta', () => {
    cy.getContaIdByName('Conta para movimentacoes')
    .then((contaId) => {
      cy.request({
        method: 'PUT',
        url: `/contas/${contaId}`,
        body: {
          nome: 'conta alterada via rest',
        },
        headers:{
          Authorization: `JWT ${Cypress.env('token')}`
        },
      })
      .as('response')

      cy.get('@response').its('status').should('eq', 200)
    })

  })

  it('não deve criar conta com nome repetido', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      body: {
        nome: 'Conta mesmo nome',
      },
      headers:{
        Authorization: `JWT ${Cypress.env('token')}`
      },
      failOnStatusCode: false,
    })
    .as('response')
    // apenas uma forma diferente de fazer o then
    cy.get('@response')
    .then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('error')
      expect(response.body.error).to.eq('Já existe uma conta com esse nome!')
    })
  })

  it('deve criar uma movimentação', () => {
    cy.getContaIdByName('Conta para movimentacoes')
    .then((contaId) => {
      cy.request({
        method: 'POST',
        url: '/transacoes',
        body: {
          "tipo": "REC",
          "data_transacao": Cypress.moment().format('DD/MM/YYYY'),
          "data_pagamento": Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
          "descricao": "Movimentacao 1",
          "valor": "100",
          "envolvido": "CCC",
          "conta_id": contaId,
          "status": true
        },
        headers:{
          Authorization: `JWT ${Cypress.env('token')}`
        },
      }).as('transacao')
      cy.get('@transacao').its('status').should('eq', 201)
      cy.get('@transacao').its('body.id').should('exist')

    })

  })

  it('deve excluir uma movimentação', () => {
    cy.getTransacaoByName('Movimentacao para exclusao')
    .then((transacao) => {
      cy.request({
        method: 'DELETE',
        url: `/transacoes/${transacao.id}`,
        headers:{
          Authorization: `JWT ${Cypress.env('token')}`
        },
      })
      .its('status').should('eq', 204)
    })

    cy.getSaldoContaByName('Conta para movimentacoes')
    .then((saldo) => {
      expect(saldo).to.eq(0)
    })
  })

  it('deve verificar o saldo', () => {
    cy.request({
      method: 'GET',
      url: '/saldo',
      headers: {
        Authorization: `JWT ${Cypress.env('token')}`
      },
    }).then((response) => {
      const contas = response.body
      let saldoConta = null
      contas.forEach((c) => {
        if(c.conta === 'Conta para saldo'){
          saldoConta = c.saldo
        }
      })
      expect(saldoConta).to.eq('534.00')
    })
  })

  it('deve alterar uma movimentação e verificar o saldo', () => {
    cy.getTransacaoByName('Movimentacao 1, calculo saldo')
    .then((transacao) => {
      cy.request({
        method: 'PUT',
        url: `/transacoes/${transacao.id}`,
        body: {
          "tipo": transacao.tipo,
          "data_transacao": Cypress.moment(transacao.data_transacao).format('DD/MM/YYYY'),
          "data_pagamento": Cypress.moment(transacao.data_transacao).format('DD/MM/YYYY'),
          "descricao": transacao.descricao,
          "valor": transacao.valor,
          "envolvido": transacao.envolvido,
          "conta_id": transacao.conta_id,
          "status": true
        },
        headers:{
          Authorization: `JWT ${Cypress.env('token')}`
        },
      }).as('transacao')
      cy.get('@transacao').its('status').should('eq', 200)
      // cy.get('@transacao').its('body.id').should('exist')
    })

    cy.request({
      method: 'GET',
      url: '/saldo',
      headers: {
        Authorization: `JWT ${Cypress.env('token')}`
      },
    }).then((response) => {
      const contas = response.body
      let saldoConta = null
      contas.forEach((c) => {
        if(c.conta === 'Conta para saldo'){
          saldoConta = c.saldo
        }
      })
      expect(saldoConta).to.eq('4034.00')
    })
  });

});
