const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-type', 'text/plain; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/imagen-super-bonita.png') {
    // ! this case will not work just because there is no image available
    fs.readFile('./placa.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        req.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('Contacto')
  } else {
    res.statusCode = 404
    res.end('404')
  }
}
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
