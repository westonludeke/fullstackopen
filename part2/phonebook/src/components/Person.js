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
        <li key={person.id}>
          {person.name}: {person.number}&nbsp;
          <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default Person;
