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

  const addContact = async (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
  
    if (!newName) {
      alert('Please enter a name');
      return;
    }
  
    if (existingPerson) {
      // Person with the same name already exists
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Do you want to update the number?`
      );
  
      if (!confirmUpdate) {
        return; // If the user cancels, do not proceed with the update
      }
  
      try {
        const updatedPerson = await personsService.update(existingPerson.id, {
          ...existingPerson,
          number: newNumber,
        });
  
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === existingPerson.id ? updatedPerson : person
          )
        );
  
        setNewName('');
        setNewNumber('');
      } catch (error) {
        console.error('Error updating contact:', error);
        // Provide feedback to the user, e.g., using an alert or displaying an error message in the UI
      }
    } else {
      // Person does not exist, add a new contact
      try {
        const returnedPerson = await personsService.create({
          name: newName,
          number: newNumber,
        });
  
        setPersons((prevPersons) => prevPersons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      } catch (error) {
        console.error('Error creating contact:', error);
        // Provide feedback to the user, e.g., using an alert or displaying an error message in the UI
      }
    }
  };
  

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
