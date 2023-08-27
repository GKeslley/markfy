import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Button from '../Reusable/Button';
import { TRANSACTION_POST } from '../../Api/api';
import styles from '../../Css/Products/Transaction.module.css';
import Error from '../Helper/Error';

const TransactionPayment = ({ dataTransaction, slug, userData, dataProduct, inputs }) => {
  const { request, loading, error } = useFetch();
  const navigate = useNavigate()

  const confirmPayment = async (event) => {
    event.preventDefault();
    const validInputs = inputs.filter((element) => element.validate());
    if (validInputs.length === inputs.length) {
      const token = localStorage.getItem('token');
      const { url, options } = TRANSACTION_POST({ body: dataTransaction, token, slug });
      const { response } = await request(url, options);
      if (response.ok) {
        alert("Compra feita com sucesso")
        navigate('/usuario/compras')
      }
    }
  };

  return (
    <>
      <ul className={styles.infos}>
        <li>
          <h2>Realizar Compra</h2>
        </li>
        <li>
          <Link to={`../../usuario/${dataProduct.usuario_id}`}>
            Vendedor: {dataProduct.nome_usuario}
          </Link>
        </li>
        <li>
          <p>Produto: {dataProduct.nome}</p>
          <p>Quantidade: 1</p>
        </li>
        <li>
          <p>
            Endereço: {userData.endereco[0].cidade}, {userData.endereco[0].endereco},{' '}
            {userData.endereco[0].numero}
          </p>
        </li>
        <li>
          <p>Total: R$ {dataProduct.preco}</p>
        </li>
        {loading ? (
          <Button disabled="disabled">Processando...</Button>
        ) : (
          <Button onClick={confirmPayment}>Fazer Pedido</Button>
        )}
        {error && <Error>Erro ao realizar transação</Error>}
      </ul>
    </>
  );
};

export default TransactionPayment;
