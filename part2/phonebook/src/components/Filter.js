import React from 'react';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter contacts by name: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
