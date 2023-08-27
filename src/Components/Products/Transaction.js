import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PRODUCT_GET } from '../../Api/api';
import { GlobalContext } from '../../UserContext';
import useValidate from '../../Hooks/useValidate';
import Input from '../Form/Input';
import styles from '../../Css/Products/Transaction.module.css';
import { FaCreditCard } from 'react-icons/fa';
import TransactionPayment from './TransactionPayment';
import TransactionSkeleton from '../Skeletons/TransactionSkeleton';
import ErrorRequest from '../Helper/ErrorRequest';

const Transaction = () => {
  const { userData } = React.useContext(GlobalContext);
  const [dataTransaction, setDataTransaction] = React.useState(null);
  const { slug } = useParams();
  const { request, data, loading, error } = useFetch();

  const cardName = useValidate(true);
  const cardNumber = useValidate('card');
  const cardExpire = useValidate('cardExpire');
  const cardCvv = useValidate('cardCvv');

  React.useEffect(() => {
    const productExist = async () => {
      if (userData) {
        const { url, options } = PRODUCT_GET(slug);
        const { response, json } = await request(url, options);
        console.log(response);
        if (response.ok) {
          setDataTransaction({
            produto: json,
            comprador_id: userData.usuario_id,
            vendedor_id: json.usuario_id,
            endereco: userData.endereco,
          });
        }
      }
    };
    productExist();
  }, [request, slug, userData]);

  if (loading) return <TransactionSkeleton />;
  if (error) return <ErrorRequest>ERRO DE TRANSAÇÃO</ErrorRequest>;
  if (!data) return null;
  return (
    <section className={`container ${styles['transaction-container']}`}>
      <div className={styles['form-content']}>
        <div className={styles.payment}>
          <picture>
            <FaCreditCard />
          </picture>
        </div>
        <form>
          <div>
            <Input
              type="text"
              label="Nome impresso no cartão"
              name="cardname"
              {...cardName}
            />
          </div>
          <div>
            <Input
              type="text"
              label="Número do cartão"
              name="cardnumber"
              {...cardNumber}
              placeholder="Ex: 0000 0000 0000 0000"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Data de validade"
              name="cardexpire"
              {...cardExpire}
              maxLength={5}
              placeholder="Ex: 00/00"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Cvv"
              name="cardcvv"
              {...cardCvv}
              maxLength={3}
              placeholder="Ex: 000"
            />
          </div>
        </form>
      </div>
      <TransactionPayment
        dataTransaction={dataTransaction}
        slug={slug}
        userData={userData}
        dataProduct={data}
        inputs={[cardName, cardNumber, cardExpire, cardCvv]}
      />
    </section>
  );
};

export default Transaction;
