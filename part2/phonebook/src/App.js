import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]); 
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      content: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObject));
    setNewName('');
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }
  // console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <input value={newName} onChange={handlePersonChange} />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App