'use strict'

const express = require('express')
const path = require('node:path')

const app = express()

const PORT = process.env.PORT ?? 3000
const users = ['Javier Montoro', 'Dolores Vega', 'Beatriz Nito']
const invalidIPs = ['144.9.81.244', '145.2.34.23']

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
  console.log(`Request reveived ${req.method} in ${req.url} from ${req.ip}`)
  next()
})

app.use((req, res, next) => {
  if (invalidIPs.indexOf(req.ip) >= 0) {
    res.status(401).end('Not authorized IP')
  } else {
    console.log('Authorized IP')
    next()
  }
})

app.use((req, res, next) => {
  req.isUCM = req.ip.startsWith('147.96')
  next()
})

app.use((req, res, next) => {
  res.status(404).render('404error', { url: req.url })
})

app.get('/index.html', (req, res) => {
  res.status(200)
    .type('text/plain; encoding="utf-8"')
    .write('Hello!')
  if (req.isUCM) { res.write('You are connected from UCM') }
  res.end()
})

app.get('/', (req, res) => {
  res.status(200)
  res.setHeader('Content-Type', 'text/html')
  res.write('This is the root page')
  res.end()
})

app.get('/users.html', (req, res) => {
  res.status(200)
  res.render('users', { users })
  // res.type('text/html')
  // res.write('<html>')
  // res.write('<head>')
  // res.write('<title>Users list</title>')
  // res.write('<meta charset="utf-8">')
  // res.write('</head>')
  // res.write('<body>')
  // res.write('<h1>HTML content generated using Express.js</h1>')
  // res.write('<ul>')
  // users.forEach((user) => {
  //   res.write(`<li>${user}</li>`)
  // })
  // res.write('</ul>')
  // res.write('</body>')
  // res.end('</html>')
})

app.listen(PORT, (err) => {
  if (err) {
    console.error('Server could not be initialized: ', err)
  } else {
    console.log(`Server intialized at port http://localhost:${PORT}`)
  }
})
