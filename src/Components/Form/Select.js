import React from 'react';
import styles from '../../Css/Form/Select.module.css';

const Select = ({ options, value, handleClick, name }) => {
  return (
    <select onChange={handleClick} value={value} name={name} className={styles.select}>
      {options.map(({ value, name }, i) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
