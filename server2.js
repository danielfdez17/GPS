const http = require('http')
const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myDB'
})

function queryDB (callback) {
  pool.getConnection((err, conexion) => {
    if (err) {
      callback(err)
    } else {
      conexion.query('SELECT * FROM table', (err, rows) => {
        conexion.release()
        if (err) {
          callback(err)
        } else {
          callback(null, rows)
        }
      })
    }
  })
}
const server = http.createServer((req, res) => {
  queryDB((err, rowsDB) => {
    if (err) {
      res.statusCode = 500
      console.error(err)
    } else {
      res.statusCode = 200
      returnWebPage(res, rowsDB)
    }
  })
})

function returnWebPage (res, rowsDB) {
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head>')
  res.write('<title>Database for phone numbers</title>')
  res.write('<meta charset="utf-8">')
  res.write('<style>th, td { border: 1px solid }</style>')
  res.write('</head>')
  res.write('<body>')
  res.write('<table>')
  res.write('<tr><th>First Name</th><th>Last Name</th>' +
    '<th>Addresses number</th></tr>')
  rowsDB.forEach(row => {
    res.write('<tr>')
    res.write(`<td>${row.name}</td>`)
    res.write(`<td>${row.lastName}</td>`)
    res.write(`<td>${row.addressesNumber}</td>`)
    res.write('</tr>')
  })
  res.write('</table>')
  res.write('</body></html>')
  res.end()
}

server.listen(3000, (err) => {
  if (err) {
    console.log(`Error when opening port 3000: ${err}`)
  } else {
    console.log('Server listening on port 3000')
  }
})
