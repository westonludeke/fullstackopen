import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const replaceNumber = window.confirm(
        `${newName} is already added to the phonebook. Would you like to replace the old number with the new one?`
      );

      if (replaceNumber) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
            setNotification(`Updated ${newName}'s number`);
            setNotificationType('success');
            setTimeout(() => {
              setNotification(null);
              setNotificationType('');
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setNotification(`Error updating ${newName}'s number`);
            setNotificationType('error');
            setTimeout(() => {
              setNotification(null);
              setNotificationType('');
            }, 5000);
          });
      }

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNotification(`Added ${newName}`);
        setNotificationType('success');
        setTimeout(() => {
        setNotification(null);
        setNotificationType('');
      }, 5000);
      })
      .catch((error) => {
        console.log(error);
        setNotification(`Error adding ${newName}`);
        setNotificationType('error');
        setTimeout(() => {
        setNotification(null);
        setNotificationType('');
      }, 5000);
      });
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deletePerson = (id) => {
    axios.delete(`http://localhost:3001/api/persons/${id}`)
      .then(response => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
        setNotification(`Deleted successfully!`);
        setNotificationType('success');
        setTimeout(() => {
          setNotification(null);
          setNotificationType('');
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        setNotification(`Error deleting contact`);
        setNotificationType('error');
        setTimeout(() => {
          setNotification(null);
          setNotificationType('');
        }, 5000);
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Contacts:</h3>
      <Person persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
