// const { promisify } = require('node:util')
// En los modulos nativos que no tienen promesas nativas
// // * this can be used when it does not exist a promise version as if it would exist
// const readFilePromises = promisify(fs.readFile) 

// ! 1. Pasarlo a modulos (.mjs)
import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
    console.log('Primer texto: ', text)
    console.log('Segundo texto: ', text2)
});