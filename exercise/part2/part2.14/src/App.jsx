import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addContact = (event) => {
    event.preventDefault()

    const contactExists = persons.some((person) => 
    person.name === newName || person.number === newNumber)

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
    
    personsService
      .create(nameObject)
      .then(returnedPersons => {
        console.log(returnedPersons)
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
    })
  }

const deleteContact = (id, name) => {
  console.log('deleteContact called')
  const confirmDelete = window.confirm(`Delete ${name}?`)
  console.log('confirmDelete:', confirmDelete)

  if (confirmDelete) {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
        
      })
  }
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
        onDelete={deleteContact}
      />
    </div>
  )
}

export default App
