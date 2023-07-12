import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter contacts by name: <input value={filter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addPerson}>
        <h3>Add New Contact:</h3>
        <div>
          <div>Name: <input value={newName} onChange={handlePersonChange} /></div>
          <br />
          <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
          <br />
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Contacts:</h3>
      <div>
        {filteredPersons.map((person) => (
          <div key={person.id}>
            {person.name}: {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
