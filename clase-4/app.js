import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import movies from './movies.json' // <-- Esto no es valido
// import movies from './movies.json' assert {type: 'json'} // Esta sintaxis no existe

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powerede-by')

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight requiere una peticion especial llamada OPTIONS

// Todos los recursos que sean MOVIES se identifican con /movies
app.use('/movies', moviesRouter)

// app.options('/movies:id', (req, res) => {
//   const origin = req.header('origin')
//   // cuando la peticion es del mismo ORIGIN, no se envia la cabedera ORIGIN
//   // http://localhost:1234 --> http://localhost:1234
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//   res.send(200)
// })

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
