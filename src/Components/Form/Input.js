import React from 'react';
import Error from '../Helper/Error';
import styles from '../../Css/Form/Input.module.css';

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
  maxLength,
}) => {
  return (
    <>
      {!placeholder && (
        <label htmlFor={name} style={{ display: 'block', marginBottom: '0.5rem' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        inputMode={inputMode}
        maxLength={maxLength}
      />
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
