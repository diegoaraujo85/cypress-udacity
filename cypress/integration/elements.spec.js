/// <reference types="Cypress" />

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html');
  })
  beforeEach(() => {
    cy.reload();
  })

  it('Text', () => {
    // should = é uma assertiva
    cy.get('body').should('contain', 'Cuidado'); // muito generico
    cy.get('body').contains('span', 'Cuidado'); // um pouco melhor, e apenas seleciona o elemento que contem o texto
    cy.get('span').should('contain', 'Cuidado'); // um pouco melhor
    cy.get('span').contains('Cuidado'); // um pouco melhor, e apenas seleciona o elemento que contem o texto

    cy.get('.facilAchar').should('contain', 'Cuidado'); // melhor
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...'); // exato
  });

  it('Links', () => {
    cy.get('[href="#"]').click()
    cy.get('#resultado').should('have.text', 'Voltou!')

    cy.reload()
    cy.get('#resultado').should('have.not.text', 'Voltou!')
    cy.contains('Voltar').click()
    cy.get('#resultado').should('have.text', 'Voltou!')
  });

  it('TextFields', () => {
    cy.get('#formNome').type('Cypress test')
    cy.get('#formNome').should('have.value', 'Cypress test')

    cy.get('#elementosForm\\:sugestoes')
      .type('textarea')
      .should('have.value', 'textarea')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
      .type('???')

    cy.get('[data-cy=dataSobrenome]')
      .type('Teste12345{backspace}{backspace}')
      .should('have.value', 'Teste123')

    cy.get('#elementosForm\\:sugestoes')
      .clear() // limpa o campo
      .type('Erro{selectall}acerto', {delay: 100}) // digita "Erro", seleciona todo o texto e depois digita "acerto" com um delay de 100ms
      .should('have.value', 'acerto')
  });

  it('RadioButton', () => {
    cy.get('#formSexoFem')
      .click()
      .should('be.checked')

    cy.get('#formSexoMasc').should('not.be.checked')

    cy.get('[name="formSexo"]').should('have.length', 2)

    cy.get('#formSexoMasc').invoke('attr', 'name')
      .then(name => {
        cy.get('#formSexoFem').invoke('attr', 'name').should('be.equal', name)
      });
  });

  it('Checkbox', () => {
    cy.get('#formComidaPizza')
      .click()
      .should('be.checked')

    cy.get('[name=formComidaFavorita]').click({multiple: true})

    cy.get('#formComidaPizza').should('not.be.checked')

    cy.get('#formComidaVegetariana').should('be.checked')
  });

  it('ComboBox', () => {
    cy.get('[data-test=dataEscolaridade]')
      .select('2o grau completo') // pode selecionar pelo texto
      .should('have.value', '2graucomp')

    cy.get('[data-test=dataEscolaridade]')
      .select('1graucomp') // pode selecionar pelo valor
      .should('have.value', '1graucomp')

    // TODO validar opções combo
    cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)
    cy.get('[data-test=dataEscolaridade] option').then($arr => {
      const values = [];
      $arr.each(function() {
        values.push(this.innerHTML)
      })

      expect(values.length).to.be.equal(8)
      expect(values).to.include.members(["Superior", "Mestrado"])
    })
  });

  it.only('Multiple ComboBox', () => {
    cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida']) // selecionar pelo value

    // TODO validar opções selecionadas
    // cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida']) // erro
    cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao', 'Corrida']) // correto, eql  = be.deep.equal
    // or
    cy.get('[data-testid=dataEsportes]').then( $el =>{
      expect($el.val()).to.be.deep.equal(['natacao', 'Corrida'])
      expect($el.val()).to.have.length(['natacao', 'Corrida'].length) // pode usar 2 direto
    })
  });
})
