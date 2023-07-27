import React from 'react';

const Select = ({ options, value, handleClick, name }) => {
  return (
    <select onChange={handleClick} value={value} name={name}>
      {options.map(({ value, name }, i) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
