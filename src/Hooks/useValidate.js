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
    message: 'Digite um número válido',
  },
  card: {
    regex:
      /^(?:4[0-9]{3}(?: [0-9]{4}){3}(?: [0-9]{3})?|5[1-5][0-9]{2}(?: [0-9]{4}){3}|6(?:011|5[0-9][0-9])(?: [0-9]{4}){3}|3[47][0-9]{2}(?: [0-9]{4}){2}(?: [0-9]{3})?|3(?:0[0-5]|[68][0-9])[0-9](?: [0-9]{4}){2}(?: [0-9]{3})?|(?:2131|1800|35\d{2})(?: [0-9]{4}){2}(?: [0-9]{3})?)$/,
    message: 'Digite um número válido',
  },
  cardExpire: {
    regex: /^(0[1-9]|1[0-2])\/\d{2}$/,
    message: 'Digite uma data válida',
  },
  cardCvv: {
    regex: /^\d{3}$/,
    message: 'Digite um valor válido',
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
    setValue(formatValue({ format: type, value: target.value.trimStart() }));
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
    setError,
    setValue,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useValidate;
