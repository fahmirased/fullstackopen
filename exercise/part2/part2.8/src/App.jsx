import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', id: 1}
  ]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const nameExists = persons.some((person) => person.content === newName)
    const numberExists = persons.some((person) => person.number === newNumber)

    if (nameExists) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    if (numberExists) {
      alert(`${newNumber} is already in the phonebook`)
      return
    }
    
    if (!newName) {
      alert('Please enter a name')
      return
    }

    const nameObject = {
      content: newName,
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
      <form onSubmit={addContact}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number: <input 
          value={newNumber} 
          onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map((person) => (
          <p key={person.id}>{person.content} {person.number}</p>
        ))}
      </div>
    </div>
  )
}

export default App
