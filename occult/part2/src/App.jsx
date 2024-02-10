import { useEffect, useState } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <em>Note app, Department of Computer Science, University of Paquirrin</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(
    () => {
      noteService.getAll().then(notes => {setNotes(notes.concat({
        id: 134141,
        content: 'Note',
        important: true
      }))})
    }
  , [])

  const addNote = (event) => {
    event.preventDefault()
    const note = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService.create(note).then(note => {
      setNotes(notes.concat(note))
      setNewNote('')  
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(changedNote.id, changedNote).then(noteUpdated => {
      setNotes(notes.map(note => (note.id === noteUpdated.id) ? noteUpdated : note))
    }).catch(error => {
        setErrorMessage(`Note ${note.content} was already removed from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(note => note.id !== changedNote.id))
      })

  }

  return (
    <div>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <ul>
          {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
        </ul>
      </div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={event => setNewNote(event.target.value)}/>
        <button type="submit">add note</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'} notes
      </button>
      <Footer />
    </div>
  )
}

export default App
