import React from 'react';
import { GET_STATES } from '../../../../Api/api';
import useFetch from '../../../../Hooks/useFetch';
import Select from 'react-select';
import RequiredInput from '../../../Reusable/RequiredInput';

const SelectState = ({ setStates, states, dataAddress, setDataAddress, selectStyle }) => {
  const { request, loading } = useFetch();

  React.useEffect(() => {
    const getStates = async () => {
      const { url, options } = GET_STATES();
      const { response, json } = await request(url, options);
      if (response.ok) {
        setStates(json);
      }
    };
    getStates();
  }, [request, setStates]);

  if (!dataAddress) return null;

  const statesArr = states.map(({ id, nome }) => {
    return { value: nome, label: nome };
  });

  const handleChange = ({ value }) => {
    setDataAddress({ ...dataAddress, uf: value, cidade: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p style={{ marginBottom: '0.5rem' }}>Estado</p>
        <RequiredInput />
      </div>
      <Select
        options={statesArr}
        onChange={handleChange}
        isLoading={loading}
        aria-label="Estado"
        value={{ value: dataAddress.uf, label: dataAddress.uf }}
        placeholder="Selecione seu Estado"
        required={true}
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

export default SelectState;
