/// <reference types="Cypress" />

it('igualdade', () => {
  const a = 1;
  expect(a).equal(1);
  expect(a, 'deveria ser 1').equal(1);
  expect(a).to.be.equal(1);
  expect('a').not.to.be.equal('b');
})

it('Verdadeiro', () => {
  const a = true;
  const b = null;
  let c;

  expect(a).to.be.true;
  expect(true).to.be.true;
  expect(b).to.be.null;
  expect(a).not.to.be.null;
  expect(c).to.be.undefined;
})

it('Object equality', ()=>{
  const obj = {
    a:1,
    b:2,
  }

  expect(obj).equal(obj);
  expect(obj).equals(obj);
  expect(obj).eq(obj);
  expect(obj).to.be.equal(obj);
  // expect(obj).to.be.equal({a:1, b:2}); // returns error
  expect(obj).to.be.deep.equal({a:1, b:2});
  expect(obj).eql({a:1, b:2});
  expect(obj).include({a:1});
  expect(obj).to.have.property('b');
  expect(obj).to.have.property('b', 2);
  expect(obj).not.be.empty;
  expect(obj).to.not.be.empty;
  expect({}).to.be.empty;
})

it('Arrays', ()=>{
  const arr = [1,2,3];

  expect(arr).equal(arr);
  expect(arr).to.have.members([1,2,3]);
  expect(arr).to.include.members([1,2,3]);
  // expect(arr).to.be.equal([1,2,3]); // returns error
  expect(arr).to.deep.be.equal([1,2,3]);
  expect(arr).to.not.be.empty;
  expect([]).to.be.empty;
})

it('Types', ()=>{
  const num = 1;
  const str = 'String';

  expect(num).to.be.a('number');
  expect(str).to.be.a('string');
  expect({}).to.be.an('object');
  expect([]).to.be.an('array');

})

it('Strings', ()=>{
  const str = 'String de teste';

  expect(str).to.be.equal('String de teste');
  expect(str).to.have.length(15);
  expect(str).to.contains('teste');
  expect(str).to.match(/de/);
  expect(str).to.match(/^String/); // inicia com String
  expect(str).to.match(/teste$/); // termina com teste
  expect(str).to.match(/.{15}/); // tamanho 15
  expect(str).to.match(/\w+/); // caracteres alfanumericos
  expect(str).to.match(/\D+/); // caracteres nao alfanumericos
  // expect(str).to.match(/\d+/); // caracteres numericos, retorna erro
})

it.only('Numbers', () => {
  const number = 4;
  const floatNumber = 5.2123;

  expect(number).to.be.equal(4);
  expect(number).to.be.above(3);
  expect(number).to.be.below(7);
  expect(number).to.be.within(3, 7);
  // expect(number).to.be.closeTo(4.9, 0.5); // +/- 0.5 -> retorna erro
  expect(number).to.be.closeTo(4.5, 0.5); // +/- 0.5
  expect(floatNumber).to.be.equal(5.2123);
  expect(floatNumber).to.be.closeTo(5.2, 0.1);
});
