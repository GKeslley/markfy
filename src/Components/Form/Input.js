import React from 'react';
import Error from '../Helper/Error';

const Input = ({ label, type, name, placeholder, onChange, onBlur, error, value }) => {
  return (
    <>
      {!placeholder && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder ? placeholder : ''}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
