import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', id: 1}
  ]);
  const [newName, setNewName] = useState('');

  const addContact = (event) => {
    event.preventDefault()

    const nameExists = persons.some((person) => person.content === newName)

    if (nameExists) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    
    const personObject = {
      content: newName,
      id: persons.length + 1, 
    }

    setPersons(persons.concat(personObject));
    setNewName('');
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map((person) => (
          <p key={person.id}>{person.content}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
