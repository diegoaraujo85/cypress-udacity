/// <reference types="Cypress" />

describe('Cypress Basics', () => {
  it.only('should visit a page and assert title', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html');

    // const title = cy.title(); // returns a promise
    // console.log(title);

    cy.title().should('be.equal', 'Campo de Treinamento');
    cy.title().should('contain', 'Campo')
    // cy.title().should('contain', 'Campo').debug() // mostra detalhes
    // cy.pause() // pausa a execução do teste

    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .should('contain', 'Campo')

    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contain', 'Campo')

    // TODO print o title no log
    // cy.title().debug() // pode ver os detalhes do title
    cy.title().then(title=>{
      console.log('Title is: ' + title) // returns the title
    })

    // TODO inserir o title em um input
    cy.title().then(title=>{
      cy.get('#formNome').invoke('val', title)
      //or
      // cy.get('#formNome').type(title)
    })

    // se quiser usar o titulo depois?
    let syncTitle;
    cy.title().then(title=>{
      syncTitle = title
    })
    cy.get('[data-cy=dataSobrenome').then(($el)=>{
      $el.val(syncTitle)
    })

    cy.get('#elementosForm\\:sugestoes').then(($el)=>{ // o nome do elemento é #elementosForm:sugestoes, aí adiciona as \\ para escapar o :
      cy.wrap($el).type(syncTitle)
    })
  });

  it('should find and interact with an element', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html');

    cy.get('#buttonSimple')
      .should('have.value', 'Clique Me!')
      .click()
      .should('have.value', 'Obrigado!')
  })

})
