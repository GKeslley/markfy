import React from 'react';

const types = {
  email: {
    regex: /[^\s@]+@[^\s@]+\.[^\s@]+/,
    message: 'Digite um email válido',
  },
  password: {
    regex: /^.{6,}$/,
    message: 'A senha deve possuir no mínimo 6 caracteres',
  },
};

const useValidate = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const currencyBRL = (value) => {
    const number = +value;
    const formatter = number.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter;
  };

  const onChange = ({ target }) => {
    if (target.inputMode === 'numeric') {
      const formatNumber = target.value.replace(/[^0-9]/g, '');
      const format = currencyBRL(+formatNumber);
      target.value = 'R$ ' + format;
    }
    setValue(target.value);
    if (error) {
      validate(value);
    }
  };

  const validate = (value) => {
    if (value === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  return {
    value,
    onChange,
    error,
    setValue,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useValidate;
