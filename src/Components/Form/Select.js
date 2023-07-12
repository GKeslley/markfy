import React from 'react';

const Select = ({ options, value, handleClick, name }) => {
  return (
    <select onChange={handleClick} value={value} name={name}>
      <option value="" disabled>
        Selecione
      </option>
      {options.map(({ value, name, nome }, i) => (
        <option key={name || nome} value={value || nome}>
          {name || nome}
        </option>
      ))}
    </select>
  );
};

export default Select;
