import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(
    () => {
      axios.get('http://localhost:3001/persons').then(
        response => {setPersons(response.data)}
      )
    }
  , [])

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
