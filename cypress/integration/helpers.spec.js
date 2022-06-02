/// <reference types="Cypress" />

describe('Helpers', () => {
  it('Wrap', () => {
    const obj = {nome:'User', idade:20}
    expect(obj).to.have.property('nome')
    cy.wrap(obj).should('have.property', 'nome')

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    cy.get('#formNome').then($el => {
      // $el.val('funciona?') // funciona, porém o cypress não rastreia (log)
      // $el.type('funciona?') // não funciona
      cy.wrap($el).type('funcionou') // funciona
    })

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('oi')
      }, 500)
    })

    // no caso abaixo, o cypress executa primeiro a promise e só então imprime os logs dos thens
    cy.get('#buttonSimple').then(()=>console.log('Encontrei o primeiro botão'));
    promise.then(val => console.log(val));
    cy.get('#buttonList').then(()=>console.log('Encontrei o segundo botão'));

    // para funcionar como esperado, deve-se deixar q o cypress cuide da promise
    cy.get('#buttonSimple').then(()=>console.log('Encontrei o primeiro botão'));
    cy.wrap(promise).then(val => console.log(val))
    cy.get('#buttonList').then(()=>console.log('Encontrei o segundo botão'));
  });

  it('Its', () => {
    const obj = {nome:'User', idade:20}
    cy.wrap(obj).should('have.property', 'nome', 'User')
    cy.wrap(obj).its('nome').should('be.equal', 'User')

    const obj2 = {nome:'User', idade:20, endereco:{ rua: 'dos bobos'}}
    cy.wrap(obj2).its('endereco').should('have.property', 'rua')
    cy.wrap(obj2).its('endereco').its('rua').should('contains', 'bobos')
    cy.wrap(obj2).its('endereco.rua').should('contains', 'bobos') // melhor q a opção de cima, pq o should pode falhar, e ao retentar, só volta um nivel, ou seja its(rua)

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    cy.title().its('length').should('be.equal', 20)
  });

  it.only('Invoke', () => {
    const getValue = () => 1;
    const soma = (a, b)=> a+b;

    cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
    cy.wrap({fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    cy.get('#formNome').invoke('val', 'Texto via invoke').should('have.value', 'Texto via invoke')

    cy.window().invoke('alert', 'Alerta via invoke')
    cy.get('#resultado')
      .invoke('html', '<input type="button" value="Hacked!" />')

  });
});
