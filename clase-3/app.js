const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')

const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'http://movies.com'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }
  }
}))
app.disable('x-powerede-by')

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight requiere una peticion especial llamada OPTIONS

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
  // const origin = req.header('origin')
  // // cuando la peticion es del mismo ORIGIN, no se envia la cabedera ORIGIN
  // // http://localhost:1234 --> http://localhost:1234
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.delete('/movies/:id', (res, req) => {
  // const origin = req.header('origin')
  // // cuando la peticion es del mismo ORIGIN, no se envia la cabedera ORIGIN
  // // http://localhost:1234 --> http://localhost:1234
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    // aqui se puede hacer esto porque todos los datos ya han sido validados
    ...result.data
  }

  // Esto no seria REST porque se guarda el estado de la app en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // para actualizar la cache del cliente
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(404).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

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
