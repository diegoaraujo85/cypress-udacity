/// <reference types="Cypress" />

describe('Work with Alerts', () =>{
  before(()=>{
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  })

  beforeEach(()=>{
    cy.reload()
  })

  it('Alert', () => {
    cy.get('#alert').click()
    cy.on('window:alert', msg => {
      console.log(msg)
      expect(msg).to.equal('Alert Simples')
    })
    // using the cy.on command
    cy.clickAlert('#alert', 'Alert Simples')
  })

  it('Alert com mock', () => {
    const stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
    })
  })

  it('Confirm', () => {
    cy.on('window:confirm', msg => {
      expect(msg).to.equal('Confirm Simples')
    })
    cy.on('window:alert', msg => {
      expect(msg).to.equal('Confirmado')
    })
    cy.get('#confirm').click()
  })

  it('Deny', () => {
    cy.on('window:confirm', msg => {
      expect(msg).to.equal('Confirm Simples')
      return false
    })
    cy.on('window:alert', msg => {
      expect(msg).to.equal('Negado')
    })
    cy.get('#confirm').click()
  })

  it('Prompt', () => {
    const valueToType = '42'
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns(valueToType)
    })
    cy.on('window:confirm', msg => {
      expect(msg).to.equal(`Era ${valueToType}?`)
    })
    cy.on('window:alert', msg => {
      expect(msg).to.equal(':D')
    })
    cy.get('#prompt').click()
  })

  it('Prompt ignored', () => {
    const valueToType = undefined
    cy.window().then(win => {
      cy.stub(win, 'prompt') // sem retorno, então retorna undefined
    })
    // cancel confirm too
    cy.on('window:confirm', msg => {
      expect(msg).to.equal(`Era ${valueToType}?`)
      return false
    })
    cy.on('window:alert', msg => {
      expect(msg).to.equal(':(')
    })
    cy.get('#prompt').click()
  })

  it('Validando mensagens', () => {
    const stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)

    cy.get('#formCadastrar').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
      })
    cy.get('#formNome').type('Diego')

    cy.get('#formCadastrar').click()
      .then(() => {
        expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
      })
    cy.get('[data-cy=dataSobrenome]').type('Araujo')

    cy.get('#formCadastrar').click()
      .then(() => {
        expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
      })
    cy.get('#formSexoMasc').click()

    cy.get('#formCadastrar').click()

    cy.get('#resultado')
      .should('contain', 'Cadastrado!')
      .and('contain', 'Nome: Diego')
      .and('contain', 'Nome: Diego')
      .and('contain', 'Sobrenome: Araujo')
      .and('contain', 'Sexo: Masculino')
  })
})
