import React from 'react';

const Person = ({ persons, deletePerson }) => {
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
  
    if (confirmDelete){
      deletePerson(id);
    }
  };

  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Person;
