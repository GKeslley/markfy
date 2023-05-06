import React from 'react';
import Error from '../Helper/Error';

const Input = ({ label, type, name, onChange, onBlur, error, value }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
