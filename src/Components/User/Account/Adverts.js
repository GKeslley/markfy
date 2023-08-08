import React from 'react';
import Select from '../../Form/Select';
import useFetch from '../../../Hooks/useFetch';
import { PRODUCTS_GET, PRODUCTS_SOLD_GET } from '../../../Api/api';
import usePagination from '../../../Hooks/usePagination';
import Pagination from '../../Reusable/Pagination';
import Image from '../../Helper/Image';
import styles from '../../../Css/User/Adverts.module.css';
import DeleteAdvert from './Advert/DeleteAdvert';
import { Link } from 'react-router-dom';

const Adverts = ({ userData }) => {
  const [value, setValue] = React.useState('venda');
  const [products, setProducts] = React.useState(null);
  const { request, loading } = useFetch();
  const { actualPage, maxPage, setTotalItems } = usePagination(20);

  const handleClick = ({ target }) => {
    setValue(target.value);
  };

  const requestProduct = React.useCallback(
    async (url, options) => {
      const { response, json } = await request(url, options);
      const total = response.headers.get('x-total-count');
      setTotalItems(total);
      setProducts(json);
    },
    [request, setTotalItems],
  );

  const getProducts = React.useCallback(
    (user) => {
      const headers = { page: actualPage, total: '20', user };
      if (value === 'vendido') {
        const { url, options } = PRODUCTS_SOLD_GET(headers);
        requestProduct(url, options);
        return null;
      }
      const { url, options } = PRODUCTS_GET(headers);
      requestProduct(url, options);
    },
    [actualPage, value, requestProduct],
  );

  React.useEffect(() => {
    if (userData) {
      getProducts(userData.usuario_id);
    }
  }, [getProducts, userData]);

  const options = [
    { value: 'venda', name: 'A venda' },
    { value: 'vendido', name: 'Vendidos' },
  ];

  if (loading) return <p>carregano</p>;
  return (
    <article className={`${styles['adverts-container']} container`}>
      <Select options={options} handleClick={handleClick} value={value} />
      <ul className={styles['adverts-content']}>
        <div className={styles['advert-row']}>
          <p>Produto</p>
          <p>Deletar</p>
        </div>
        {products &&
          products.map(({ id, fotos, nome, preco, categoria, slug }, i) => (
            <li key={id} className={styles.adverts}>
              <Link
                to={`/produto/${categoria}/${slug}`}
                className={styles['advert-infos']}
              >
                <picture>
                  <Image alt={fotos[0].alt} src={fotos[0].src} />
                </picture>
                <div>
                  <p>{nome}</p>
                  <span>R$ {preco}</span>
                </div>
              </Link>
              <DeleteAdvert
                slug={slug}
                index={i}
                getProducts={() => getProducts(userData.usuario_id)}
              />
            </li>
          ))}
        <Pagination maxPage={maxPage} actualPage={actualPage} />
      </ul>
    </article>
  );
};

export default Adverts;
