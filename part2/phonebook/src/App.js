import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', id: 1, number: '040-123-4567' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>Name: <input value={newName} onChange={handlePersonChange} /></div>
          <br />
          <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
          <br />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person.id}>{person.name}: {person.number}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
