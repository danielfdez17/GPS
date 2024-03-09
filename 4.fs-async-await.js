// const { promisify } = require('node:util')
// En los modulos nativos que no tienen promesas nativas
// // * this can be used when it does not exist a promise version as if it would exist
// const readFilePromises = promisify(fs.readFile) 


const { readFile } =  require('node:fs/promises');

// * funcion autoinvocada
// ! IIFE - Immediately Invoked Function Expression
(
    async () => {
        console.log('Leyendo el primer archivo ...')
        const text = await readFile('./archivo.txt', 'utf-8')
        console.log('Primer texto: ', text)
        
        console.log('Hacer cosas mientras se lee el primer archivo ...')
        
        console.log('Leyendo el segundo archivo ...')
        const text2 = await readFile('./archivo2.txt', 'utf-8')
        console.log('Segundo texto: ', text2)
    }
)()
