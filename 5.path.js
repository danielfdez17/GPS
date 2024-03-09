const path = require("node:path")

// * barra separadora de carpetas segun SO
console.log(path.sep);

// * unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath);

const base = path.basename('/tmp/m/passwd.txt')
console.log(base);

const fileName = path.basename('/tmp/m/passwd.txt', '.txt');
console.log(fileName);

const extension = path.extname('img.jpg')
console.log(extension);