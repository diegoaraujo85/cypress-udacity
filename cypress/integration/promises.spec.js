it('sem tests, ainda', () => {})

const getSomething = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('13')
    }, 1000)
  })
}

const system = async()=>{
  consol.log('init')
  const some = await getSomething();
  console.log(`Something is ${some}`)
  console.log('end');
}

system();
