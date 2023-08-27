import React from 'react';
import Error from '../Helper/Error';
import styles from '../../Css/Form/Input.module.css';

const TextArea = ({ label, name, onChange, onBlur, error, value }) => {
  return (
    <>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '0.5rem' }}>
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={styles.input}
      ></textarea>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default TextArea;
