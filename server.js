'use strict'

const http = require('http')

const server = http.createServer((request, res) => {
  console.log(`Method ${request.method}`)
  console.log(`URL ${request.url}`)
  console.log(`Headers ${request.headers}`)
  res.status(200)
  res.setHeader('Content-Type', 'text/html')
  res.write('<!DOCTYPE html>')
  res.write('<html>')
  res.write('<head>')
  res.write('<title>Test web page</title>')
  res.write('<<meta charset="utf-8">')
  res.write('</head>')
  res.write('<body>')
  res.write('<ul>')
  for (let i = 0; i < 10; ++i) {
    res.write(`<li>Item ${i} </li>`)
  }
  res.write('</ul></body></html>')
  res.end()
})

server.listen(3000, (err) => {
  if (err) {
    console.log(`Error when opening port 3000: ${err}`)
  } else {
    console.log('Server listening on port 3000')
  }
})
