// * argumentos de entrada
// console.log(process.argv);

// * controlar el proceso y su salida
// process.exit(0); // ! KO
// process.exit(1); // * OK

// * podemos controlar eventos del proceso
process.on('exit', () => {
  // ? limipar los recursos
})

// * current working directory (directory from node <file.js> is launched)
console.log(process.cwd())

// * platform
console.log(process.env.PEPITO)
// ? usage: PEPITO=adios node 7.process.js
