/// <reference types="Cypress" />

describe('Waiting...', () => {
  before(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html');
  })

  beforeEach(() => {
    cy.reload();
  })

  it('should wait element be available', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click() // botao dispara evento que cria o input após 3s
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('funciona') // aguarda o input ser criado para digitar nele
  })

  it('should do retry', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click() // botao dispara evento que cria o input após 3s
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo')
      // .should('not.exist') // ao verificar que o elemento não existe, não retorna nada, não dando pra continuar o encadeamento
      .should('exist')
      .type('funciona')

    /* falha tudo*/
    // cy.get('#novoCampo')
    //   .should('not.exist') // ao verificar que o elemento não existe, não retorna nada, não dando pra continuar o encadeamento
    //   .should('exist')
    //   .type('funciona')
  })

  it('Using find ', () => {
    // case 1
    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1') // quando faz encadeamento, o item atual fica ligado apenas ao seu item anterior, ou seja o find, que por sua vez esta preso ao get
    // cy.get('#lista li') // falhou pq parou no get anterior do Item 1
    //   .find('span') // comando
    //   .should('contain', 'Item 2') // assertiva, ao falhar tenta executar o comando acima dele, ou seja o find
    cy.get('#lista li span')
      .should('contain', 'Item 2')

    // case 2
    cy.get('#buttonListDOM').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')
    cy.get('#lista li span')
      .should('contain', 'Item 2')
  });

  it('Uso do timeout', () => {
    // timeout padrão é 4s, se quiser para o projeto todo setar "defaultCommandTimeout": 10000 <-- 10s em cypress.json
    // cy.get('#buttonDelay').click();
    // cy.get('#novoCampo',{timeout:1000}).should('exist');

    // cy.get('#buttonListDOM').click()
    // // cy.wait(5000); // espera 5s, usar apenas em casos especificos, não é aconselhado usar, podendo setar o timeout que não é blocking
    // cy.get('#lista li span', { timeout: 30000 }) // vai esperar no maximo 30s, porém se encontrar antes libera o fluxo
    //   .should('contain', 'Item 2')

    cy.get('#buttonListDOM').click()
    cy.get('#lista li span', { timeout: 30000 }) // vai esperar no maximo 30s, porém se encontrar antes libera o fluxo
      .should('have.length', 2)
  });

  it('Click retry', () => {
    cy.get('#buttonCount')
      .click() // o click não tem retry, q é para não sujar o HTML
      .click()
      .should('have.value', '111')
  });

  it.only('should vs then', () => {
    // should fica repeteindo a cada re-tentativa, o then apenas quando o get é executado
    cy.get('#buttonListDOM').click()
    cy.get('#buttonListDOM').then($el =>{ // usar o $ é uma convenção, não é obrigatório
      // com o then tem o poder de mudar o retorno
      expect($el).to.have.length(1)
      return 2
    })
    .and('eq', 2)
    .and('not.have.id', 'buttonListDOM')

    cy.get('#buttonListDOM').should($el =>{ // usar o $ é uma convenção, não é obrigatório
      // o should sempre retorna o elemento
      expect($el).to.have.length(1)
    })
    .and('have.id', 'buttonListDOM')

    cy.get('#buttonListDOM').then($el =>{ // usar o $ é uma convenção, não é obrigatório
      // com o then tem o poder de mudar o retorno
      expect($el).to.have.length(1)
      cy.get('#buttonList') // dentro do then é possivel fazer uma nova busca
    })

    // cy.get('#buttonListDOM').should($el =>{ // usar o $ é uma convenção, não é obrigatório
    //   expect($el).to.have.length(1)
    //   cy.get('#buttonList') // dentro do should não é possivel fazer uma nova busca, entra em loop!
    // })
  });
});
