const express = require('express')
const app = express()

const phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Prueba<h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find(person => person.id === id)
  console.log(person)
  if (person) res.json(person)
  else {
    res.statusMessage = `person with id ${id} not exist`
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  console.log(date)
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {console.log(`Server running in port ${PORT}`)})
