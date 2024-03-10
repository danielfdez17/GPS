const fs = require('node:fs')

console.log('Leyendo el primer archivo ...')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Error when reading the file', err)
  }
  console.log(text)
})

console.log('Hacer cosas mientras se lee el primer archivo ...')

console.log('Leyendo el segundo archivo ...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Error when reading the file', err)
  }
  console.log(text)
})
