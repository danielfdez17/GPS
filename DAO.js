const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'miBD'
})

pool.getConnection((err, conexion) => {
  if (err) {
    console.log(`Error when obtaining the conexion: ${err.message}`)
  } else {
    conexion.query('SELECT * FROM TABLE',
      (err, rows) => {
        conexion.release()
        if (err) {
          console.log('Error when executing the query')
        } else {
          rows.array.forEach(row => {
            console.log(`${row.first_name}, ${row.last_name}`)
          })
        }
      })
    conexion.query('SELECT * FROM TABLE WHERE')
  }
})
