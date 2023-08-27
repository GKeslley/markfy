import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import { TRANSACTION_GET } from '../../../Api/api';
import { Link } from 'react-router-dom';
import Image from '../../Helper/Image';
import styles from '../../../Css/User/Shopping.module.css';
import Modal from '../../Reusable/Modal';
import ShoppingSkeleton from '../../Skeletons/ShoppingSkeleton';
import ErrorRequest from '../../Helper/ErrorRequest';

const Shopping = () => {
  const [activeModal, setActiveModal] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const { request, data, loading } = useFetch();

  React.useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem('token');
      const { url, options } = TRANSACTION_GET({ token, total: '20' });
      await request(url, options);
    };
    getProducts();
  }, [request]);

  const handleActiveModal = (dataProduct) => {
    setActiveModal(true);
    setProduct(dataProduct);
  };

  if (loading) return <ShoppingSkeleton />;
  if (!data) return <ErrorRequest>Você ainda não fez compras</ErrorRequest>;
  return (
    <>
      <ul className={`${styles['shopping-container']} container`}>
        {data.map(({ produto, data, vendedor_id }) => (
          <li key={produto.id}>
            <picture>
              <Image alt={produto.fotos[0].titulo} src={produto.fotos[0].src} />
            </picture>
            <div className={styles['product-infos']}>
              <Link to={`produto/${produto.categoria}/${produto.id}`}>
                {produto.nome}
              </Link>
              <span>R$ {produto.preco}</span>
              <p
                className={`${styles['more-infos-element']} ignore-click-outside`}
                onClick={() => handleActiveModal({ produto, data, vendedor_id })}
              >
                Mais informações
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Modal active={activeModal} setActive={setActiveModal} title="Produto">
        {product && (
          <div className={styles['shopping-modal']}>
            <p>Produto: {product.produto.nome}</p>
            <span>Preço: R$ {product.produto.preco}</span>
            <p>Data de Compra: {product.data}</p>
            <p>
              Vendedor:{' '}
              <Link to={`/usuario/${product.vendedor_id}`}>{product.vendedor_id}</Link>
            </p>

            <Link to={`/produto/${product.produto.categoria}/${product.produto.id}`}>
              Postagem
            </Link>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Shopping;
