import React from 'react';
import Error from '../Helper/Error';

const Input = ({
  label,
  type,
  className,
  name,
  placeholder,
  onChange,
  onBlur,
  error,
  value,
  inputMode,
}) => {
  return (
    <>
      {!placeholder && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        className={className}
        placeholder={placeholder ? placeholder : ''}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        inputMode={inputMode}
      />
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
