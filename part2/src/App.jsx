import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {personService.getAll().then(persons => setPersons(persons))}
  , [])

  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const person = persons.find(person => person.name === newName)
    if (person) {
      console.log(person)
      const question = `${person.name} is already added to the phone, replace the old number with a new one`
      if (window.confirm(question)) {
        personService.update(person.id, {...person, number: newNumber}).then(updatedPerson => {
          setPersons(persons.map(person => (person.id === updatedPerson.id) ? updatedPerson : person))
          setMessage(`Updated ${updatedPerson.name}`)
          setTimeout(() => setMessage(null), 2000)
        })
      }
    }
    else personService.create(newPerson).then(person => {
      setPersons(persons.concat(person))
      setMessage(`Added ${person.name}`)
      setTimeout(() => setMessage(null), 2000)
    })
  }

  const filterHandler = (event) => setFilterName(event.target.value) 
  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const deleteHandle = (id) => {
   if (window.confirm(`delete ${persons.find(person => person.id === id).name}`))personService.deletePerson(id).then(deletedPerson => setPersons(persons.filter(person => person.id !== deletedPerson.id))) 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Phonebook filterName={filterName} filterHandler={filterHandler} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} addNumber={addNumber} />

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} deleteHandle={deleteHandle}/> 
    </div>
  )
}

export default App
