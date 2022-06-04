// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import locators from '../support/locators';

Cypress.Commands.add('clickAlert', (selector, message) => {
  cy.get(selector).click()
  cy.on('window:alert', msg => {
    expect(msg).to.equal(message)
  })
})

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://barrigareact.wcaquino.me')
  cy.get(locators.LOGIN.EMAIL).type(email)
  cy.get(locators.LOGIN.PASSWORD).type(password)
  cy.get(locators.LOGIN.BTN_LOGIN).click()
  cy.get(locators.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
  cy.get(locators.MENU.SETTINGS).click()
  cy.get(locators.MENU.RESET).click()
  cy.get(locators.MESSAGE).should('contain', 'Dados resetados com sucesso!')
})

// commands api rest

Cypress.Commands.add('getToken', (email, senha, redirecionar=false) => {
  cy.request({
    method: 'POST',
    url: '/signin',
    body: {
      email,
      senha,
      redirecionar,
    },
  })
  .its('body.token').should('not.be.empty')
  .then(token => {
    Cypress.env('token', token)
  })
})

Cypress.Commands.add('resetRest', () => {
  cy.request({
    method: 'GET',
    url: '/reset',
    headers: {
      Authorization: `JWT ${Cypress.env('token')}`,
    },
  })
  .then((response) => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('getContaIdByName', (nomeConta) => {
  cy.request({
    method: 'GET',
    url: `/contas`,
    headers:{ Authorization: `JWT ${Cypress.env('token')}` },
    qs: {
      nome: nomeConta,
    }
  })
  .its('body.0.id').should('not.be.empty')
  .then((id) =>  id)
})

Cypress.Commands.add('getTransacaoByName', (descricaoTransacao) => {
  cy.request({
    method: 'GET',
    url: `/transacoes`,
    headers:{ Authorization: `JWT ${Cypress.env('token')}` },
    qs: {
      descricao: descricaoTransacao,
    }
  })
  .then((response) =>  response.body[0])
})

Cypress.Commands.add('getSaldoContaByName', (contaNome) => {
    let saldoConta = 0
    cy.request({
      method: 'GET',
      url: '/saldo',
      headers: {
        Authorization: `JWT ${Cypress.env('token')}`
      },
    }).then((response) => {
      const contas = response.body
      contas.forEach((c) => {
        if(c.conta === contaNome){
          saldoConta= c.saldo
        }
      })
      return saldoConta
    })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  if (options.length === 1) {
    options[0].headers = {
        Authorization : `JWT ${Cypress.env('token')}`
    }
  }
  return originalFn(...options)
})
