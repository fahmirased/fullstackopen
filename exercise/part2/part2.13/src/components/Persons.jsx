import React from "react";

const Persons = ({persons, search}) => {
    
    const searchPerson = persons.filter((person) =>
        person.name && person.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
        {searchPerson.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    )
}

export default Persons