import React from 'react';

const PersonForm = ({ newName, newNumber, handlePersonChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <h3>Add New Contact:</h3>
      <div>
        <div>
          Name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <br />
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <br />
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
