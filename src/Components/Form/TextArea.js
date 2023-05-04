import React from 'react';
import Error from '../Helper/Error';

const TextArea = ({ label, name, onChange, onBlur, error, value }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      ></textarea>
      <Error>{error}</Error>
    </>
  );
};

export default TextArea;
