import React from 'react';

const formatter = {
  cep: {
    format: (value) => value.replace(/(\d{5})(\d{3})/, '$1-$2'),
  },
  phone: {
    format: (value) => {
      if (!value) return '';
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      return value;
    },
  },
  card: {
    format: (value) => {
      value = value.replace(/\D/g, '');
      value = value.replace(/^(\d{4})(\d)/g, '$1 $2');
      value = value.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3');
      value = value.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4');
      return value;
    },
  },
  cardExpire: {
    format: (value) => {
      value = value.replace(/\D/g, '');
      if (value.length > 2) {
        value = value.replace(/(\d{2})(\d)/, '$1/$2');
      }
      return value;
    },
  },
};

const useFormatter = () => {
  const formatValue = React.useCallback(({ format, value }) => {
    return value && formatter[format] ? formatter[format].format(value) : value;
  }, []);

  return { formatValue };
};

export default useFormatter;
