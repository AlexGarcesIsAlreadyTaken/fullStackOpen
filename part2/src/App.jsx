import { useState } from 'react'

const Number = ({number}) => (<li>{number.name} {number.number}</li>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) === undefined) 
      setPersons(persons.concat({name: newName, number: newNumber, id:persons.length + 1}))
    else alert(newName + ' is already added to phonebook')
  }

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with <input value={filterName} onChange={(event) => {setFilterName(event.target.value)}}/>

      <h2>add a new </h2>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/></div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {personsFiltered.map(person => <Number key={person.id} number={person}/>)}
      </ul>
      
    </div>
  )
}

export default App
