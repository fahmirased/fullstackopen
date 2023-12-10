import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState([])
  const [newNumber, setNewNumber] = useState([])
  const [search, setSearch] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const contactExists = persons.some((person) => 
    person.content === newName || person.number === newNumber)

    if (contactExists) {
      alert('Contact with the same name or number already exists in the phonebook.')
      return
    }
    
    if (!newName) {
      alert('Please enter a name')
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1, 
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        search = {search}
        setSearch = {setSearch}
      />
      <h2>add a new</h2>
      <PersonForm 
        addContact = {addContact}
        newName = {newName}
        newNumber = {newNumber}
        setNewName = {setNewName}
        setNewNumber = {setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons = {persons}
        search={search}
      />
    </div>
  )
}

export default App
