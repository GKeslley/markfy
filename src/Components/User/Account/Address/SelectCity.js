import React from 'react';
import Select from 'react-select';
import { GET_CITIES } from '../../../../Api/api';
import useFetch from '../../../../Hooks/useFetch';

const SelectCity = ({ states, dataAddress, setDataAddress, selectStyle }) => {
  const [cities, setCities] = React.useState([]);
  const { request, loading } = useFetch();
  const dataState = states.find(({ nome }) => {
    return dataAddress ? nome === dataAddress.uf : null;
  });

  React.useEffect(() => {
    console.log('teste');
    if (states.length && dataState) {
      const getCities = async () => {
        const { sigla } = dataState;
        const { url, options } = GET_CITIES(sigla);
        const { response, json } = await request(url, options);
        if (response.ok) {
          setCities(json);
        }
      };
      getCities();
    }
  }, [dataState, setCities, states, request]);
  console.log(dataAddress);
  if (!dataAddress) return null;

  const citiesArr = cities.map(({ nome }) => {
    return { value: nome, label: nome };
  });

  const handleChange = ({ value }) => {
    setDataAddress({ ...dataAddress, cidade: value });
  };

  return (
    <div>
      <p style={{ marginBottom: '0.5rem' }}>Cidade</p>
      <Select
        options={citiesArr}
        onChange={handleChange}
        isLoading={loading}
        isDisabled={!dataAddress.uf || loading}
        value={{ value: dataAddress.cidade, label: dataAddress.cidade }}
        loadingMessage={() => 'Carregando...'}
        placeholder="Selecione sua Cidade"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            ...selectStyle(state),
          }),
        }}
      />
    </div>
  );
};

export default SelectCity;
