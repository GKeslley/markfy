import React from 'react';
import useValidate from '../../../Hooks/useValidate';
import Input from '../../Form/Input';
import useFormatter from '../../../Hooks/useFormatter';
import SelectState from './Address/SelectState';
import SelectCity from './Address/SelectCity';
import styles from '../../../Css/User/Address.module.css';
import Button from '../../Reusable/Button';
import { POST_USER_ADDRESS } from '../../../Api/api';
import useFetch from '../../../Hooks/useFetch';
import AddressSkeleton from '../../Skeletons/AddressSkeleton';

const formFields = {
  cep: '',
  endereco: '',
  bairro: '',
  numero: '',
  complemento: '',
  cidade: '',
  uf: '',
  referencia: '',
};

const selectStyle = (state) => {
  return {
    border: '1px solid #2dd096',
    minHeight: '34px',
    maxHeight: '34px',
    boxShadow: state.isFocused && '0 0 0 1px #0e9162, 0 0 0 2px #1aeea4',
    '&:hover': { borderColor: '#0e9162' },
    whiteSpace: 'nowrap',
  };
};

const Address = ({ userData }) => {
  const [dataAddress, setDataAddress] = React.useState(formFields);
  const [states, setStates] = React.useState([]);
  const { formatValue } = useFormatter();
  const { request, loading } = useFetch();

  const cep = useValidate('cep');
  const address = useValidate();
  const numberHouse = useValidate();
  const complement = useValidate(false);
  const neighborhood = useValidate();
  const referencePoint = useValidate(false);

  const { setValue: setCepValue } = cep;
  const { setValue: setAddressValue } = address;
  const { setValue: setNumberHouseValue } = numberHouse;
  const { setValue: setComplementValue } = complement;
  const { setValue: setNeighborhoodValue } = neighborhood;
  const { setValue: setReferencePointValue } = referencePoint;

  console.log(userData);

  const setDefaultValues = React.useCallback(() => {
    const { cep, endereco, numero, complemento, bairro, referencia } =
      userData.endereco[0];
    setCepValue(formatValue({ format: 'cep', value: cep }));
    setAddressValue(endereco);
    setNumberHouseValue(numero);
    setComplementValue(complemento);
    setNeighborhoodValue(bairro);
    setReferencePointValue(referencia);
  }, [
    formatValue,
    setAddressValue,
    setCepValue,
    setComplementValue,
    setNeighborhoodValue,
    setNumberHouseValue,
    setReferencePointValue,
    userData,
  ]);

  React.useEffect(() => {
    if (userData && userData.endereco) {
      const { endereco } = userData;
      setDataAddress(() => {
        return Object.entries(formFields).reduce((acc, act) => {
          return { ...acc, [act[0]]: endereco[0][act[0]] || '' };
        }, {});
      });
      setDefaultValues();
    }
  }, [setDefaultValues, userData]);

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setDataAddress({
      ...dataAddress,
      [name]: formatValue({ format: name, value }),
    });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const { url, options } = POST_USER_ADDRESS({ body: dataAddress, token });
    if (
      cep.validate() &&
      address.validate() &&
      numberHouse.validate() &&
      neighborhood.validate()
    ) {
      await request(url, options);
    }
  };

  if (!userData) return <AddressSkeleton />;
  return (
    <div className={`${styles.address} container`}>
      <form onChange={handleChangeForm} onSubmit={handleSubmitForm}>
        <div>
          <Input type="text" name="cep" label="CEP" required={true} {...cep} />
        </div>
        <div className={styles['address-element']}>
          <div className={styles['address-element-input']}>
            <Input
              type="text"
              name="endereco"
              label="Endereço"
              required={true}
              {...address}
            />
          </div>
          <div className={styles['address-element-input']}>
            <Input
              type="number"
              name="numero"
              label="Número"
              required={true}
              {...numberHouse}
            />
          </div>
          <div className={styles['address-element-input']}>
            <Input type="text" name="complemento" label="Complemento" {...complement} />
          </div>
        </div>
        <div className={styles['address-element']}>
          <div className={styles['address-element-input']}>
            <Input
              type="text"
              name="bairro"
              label="Bairro"
              required={true}
              {...neighborhood}
            />
          </div>
          <div className={styles['address-element-input']}>
            <SelectState
              setStates={setStates}
              states={states}
              dataAddress={dataAddress}
              setDataAddress={setDataAddress}
              selectStyle={selectStyle}
            />
          </div>
          <div className={styles['address-element-input']}>
            <SelectCity
              states={states}
              dataAddress={dataAddress}
              setDataAddress={setDataAddress}
              selectStyle={selectStyle}
            />
          </div>
        </div>
        <div>
          <Input
            type="text"
            name="referencia"
            label="Ponto de Referência"
            {...referencePoint}
          />
        </div>

        {loading ? (
          <Button disabled="disabled">Carregando...</Button>
        ) : (
          <Button>Atualizar Endereço</Button>
        )}
      </form>
    </div>
  );
};

export default Address;
