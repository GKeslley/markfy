import React from 'react';

const Select = ({ options, value, handleClick }) => {
  return (
    <select onChange={handleClick} value={value}>
      {options.map(({ value, name }) => (
        <option value={value}>{name}</option>
      ))}
    </select>
  );
};

export default Select;
