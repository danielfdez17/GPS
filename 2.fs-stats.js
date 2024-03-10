const fs = require('node:fs') // ! recomendado a partir de Node 16 poner 'node:"module"'
const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)
