/// <reference types="Cypress" />

it('a external test', () => {})

describe('group tests', () =>{
  describe('more specifig group tests', () =>{
    it.skip('specific test', () => {})
  })

  it('a internal test', () => {})
})