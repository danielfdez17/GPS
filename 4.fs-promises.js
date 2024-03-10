// const { promisify } = require('node:util')
// En los modulos nativos que no tienen promesas nativas
// // * this can be used when it does not exist a promise version as if it would exist
// const readFilePromises = promisify(fs.readFile)
const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo ...')
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('Primer texto: ', text)
  })

console.log('Hacer cosas mientras se lee el primer archivo ...')

console.log('Leyendo el segundo archivo ...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('Segundo texto: ', text)
  })
