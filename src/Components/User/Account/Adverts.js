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
import AdvertsSkeleton from '../../Skeletons/AdvertsSkeleton';
import ErrorRequest from '../../Helper/ErrorRequest';
import RequestMessage from '../../Reusable/RequestMessage';

const Adverts = ({ userData }) => {
  const [value, setValue] = React.useState('venda');
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const [notification, setNotification] = React.useState({ error: false, message: '' });
  const { request, data, loading, error } = useFetch();
  const { actualPage, maxPage, setTotalItems } = usePagination(20);

  const handleClick = ({ target }) => {
    setValue(target.value);
  };

  const requestProduct = React.useCallback(
    async (url, options) => {
      const { response } = await request(url, options);
      const total = response.headers.get('x-total-count');
      setTotalItems(total);
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

  if (loading) return <AdvertsSkeleton />;
  return (
    <article className={`${styles['adverts-container']} container`}>
      <Select options={options} handleClick={handleClick} value={value} />
      <ul className={styles['adverts-content']}>
        <div className={styles['advert-row']}>
          <p>Produto</p>
          <p>Deletar</p>
        </div>
        {data &&
          data.map(({ id, fotos, nome, preco, categoria, slug }, i) => (
            <>
              {deleteIndex !== i && (
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
                    setDeleteIndex={() => setDeleteIndex(i)}
                    setNotification={setNotification}
                  />
                </li>
              )}
            </>
          ))}
        {error && <ErrorRequest>{error}</ErrorRequest>}
        {notification.message && (
          <RequestMessage notification={notification} setNotification={setNotification} />
        )}
        <Pagination maxPage={maxPage} actualPage={actualPage} />
      </ul>
    </article>
  );
};

export default Adverts;
