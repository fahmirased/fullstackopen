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
  const [notification, setNotification] = useState(null)

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
  
    try {
      const existingPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
  
      if (!newName) {
        setNotification({ type: 'error', message: 'Please enter a name' });
        return;
      }
  
      // Check if a person with the same name already exists
      if (existingPerson) {
        // Update the existing contact with the new number
        const updatedPerson = await personsService.update(existingPerson.id, {
          ...existingPerson,
          number: newNumber,
        })

        const confirmUpdate = window.confirm(
          `${newName} is already added to the phonebook. Do you want to update the number?`
        );
  
        if (!confirmUpdate) {
          // If the user cancels, do not proceed with the update
          return;
        }
  
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === existingPerson.id ? updatedPerson : person
          )
        );
  
        setNotification({
          type: 'success',
          message: `Number updated for ${newName}`,
        });
  
        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
  
        setNewName('');
        setNewNumber('');
      } else {
        // Person does not exist, add a new contact
        const returnedPerson = await personsService.create({
          name: newName,
          number: newNumber,
        });
  
        setPersons((prevPersons) => prevPersons.concat(returnedPerson));
  
        setNotification({
          type: 'success',
          message: `Added ${newName}`,
        });
  
        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
  
        setNewName('');
        setNewNumber('');
      }
    } catch (error) {
      console.error('Error:', error);
      
      event.stopPropagation();

      // Handle errors and set the appropriate notification type and message
      if (error.response && error.response.status === 404){
        setNotification({
          type: 'error',
          message: `Information of ${newName} has already removed from the server`,
        })
      } else if (error.response) {
        setNotification({
          type: 'error',
          message: error.response.data.error,
        });
      } else if (error.request) {
        setNotification({
          type: 'error',
          message: 'Server not responding. Please try again later.',
        });
      } else {
        setNotification({
          type: 'error',
          message: 'An unexpected error occurred. Please try again.',
        });
      }
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  

const deleteContact = (id, name) => {
  console.log('deleteContact called');
  const confirmDelete = window.confirm(`Delete ${name}?`);
  console.log('confirmDelete:', confirmDelete);

  if (confirmDelete) {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));

        setNotification({
          type: 'success',
          message: `${name} has been removed from the server.`,
        });

        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);

        setNotification({
          type: 'error',
          message: `Error removing ${name} from the server.`,
        });

        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  }
};


  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <div className={`notification ${notification.type}`}> 
          {notification.message}
        </div>
      )}
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
