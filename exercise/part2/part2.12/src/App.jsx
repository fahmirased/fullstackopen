import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState([])
  const [newNumber, setNewNumber] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
    axios
    .post('http://localhost:3001/persons', nameObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
  })
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