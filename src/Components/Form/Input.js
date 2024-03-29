import React from 'react';
import Error from '../Helper/Error';
import styles from '../../Css/Form/Input.module.css';
import RequiredInput from '../Reusable/RequiredInput';

const Input = ({
  label,
  type,
  className = styles.input,
  name,
  onChange,
  onBlur,
  error,
  value,
  placeholder,
  inputMode,
  maxLength,
  required,
  maxSize,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={name} style={{ display: 'block', marginBottom: '0.5rem' }}>
          {label}
          {required && <RequiredInput />}
        </label>
      )}
      {maxSize ? (
        <div style={{ position: 'relative' }}>
          <span className={styles.maxSize}>{maxSize}</span>
          <input
            type={type}
            name={name}
            id={name}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            inputMode={inputMode}
            maxLength={maxLength}
            required={required}
          />
        </div>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          inputMode={inputMode}
          maxLength={maxLength}
          required={required}
        />
      )}

      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
