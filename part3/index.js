const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny', {
  skip: (req, res) => {return req.method === "POST"}
}))

morgan.token('post', (req, res) => {
  console.log(req.body)
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post', {
  skip: (req, res) => {return req.method !== "POST"}
}))

let phonebook = [
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
  if (person) res.json(person)
  else {
    res.statusMessage = `person with id ${id} not exist`
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find(person => person.id === id)

  res.statusMessage = "person deleted"
  res.status(204).end()
  phonebook = phonebook.filter(person => person.id !== id)
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  if (!newPerson.number || !newPerson.name) {
    const errorMessage = "missing number, name or both"
    res.status(400).json({error: errorMessage})
    return
  }
  if (phonebook.find(person => person.name === newPerson.name)) {
    const errorMessage = `${newPerson.name} is already on the phonebook`
    res.status(409).json({error: errorMessage})
    return
  }
  let id = 1
  while (phonebook.find(person => person.id === id)) id = Math.floor(Math.random()*10000000)
  phonebook = phonebook.concat({...newPerson, id})
  res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {console.log(`Server running in port ${PORT}`)})
