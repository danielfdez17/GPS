'use strict'

const fs = require('node:fs')

const file = 'file.txt'

fs.readFile(file,
  { encoding: 'utf-8' },
  (err, content) => {
    if (err) {
      console.log('An error ocurred')
      console.log(err.message)
    } else {
      console.log(`File ${file} read`)
      console.log(content)
    }
  }
)
