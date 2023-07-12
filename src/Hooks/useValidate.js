import React from 'react';
import useFormatter from './useFormatter';

const types = {
  email: {
    regex: /[^\s@]+@[^\s@]+\.[^\s@]+/,
    message: 'Digite um email válido',
  },
  password: {
    regex: /^.{6,}$/,
    message: 'A senha deve possuir no mínimo 6 caracteres',
  },
  cep: {
    regex: /^[0-9]{5}-[0-9]{3}$/,
    message: 'Digite um cep válido',
  },
  phone: {
    regex: /(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/,
    message: 'Digite um número valido',
  },
};

const useValidate = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const { formatValue } = useFormatter();
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
    setValue(formatValue({ format: type, value: target.value }));
    if (error) {
      validate(value);
    }
  };
  const validate = (value) => {
    if (type === false) return true;
    if (value.length < 1) {
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
