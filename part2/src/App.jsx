import { useState } from 'react'

const Number = ({number}) => (<li>{number.name} {number.number}</li>)

const Persons = ({persons}) => <ul>
  {persons.map(person => <Number key={person.id} number={person} />)}
</ul>

const PersonForm = ({newName, newNumber, handleName, handleNumber, addNumber}) => (
    <form onSubmit={addNumber}>
      <div>name: <input value={newName} onChange={handleName}/></div>
      <div>number: <input value={newNumber} onChange={handleNumber}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
)

const Phonebook = ({filterName, filterHandler}) => {
  return (
    <>filter shown with <input value={filterName} onChange={filterHandler}/></>
  )
}

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

  const filterHandler = (event) => setFilterName(event.target.value) 
  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook filterName={filterName} filterHandler={filterHandler} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} addNumber={addNumber} />

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} /> 
    </div>
  )
}

export default App
