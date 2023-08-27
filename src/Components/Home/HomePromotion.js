import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PRODUCTS_GET_BY_CATEGORY } from '../../Api/api';
import ScrollTriggeredRequestComponent from '../../Hooks/useScrollApiRequest';
import Image from '../Helper/Image';
import styles from '../../Css/Home/HomePromotion.module.css';
import useCountdown from '../../Hooks/useCountdown';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const HomePromotion = ({ product, dataProduct }) => {
  const { request, data } = useFetch();
  const refContent = React.useRef(null);
  const { shouldFetchData, setPosition } = ScrollTriggeredRequestComponent();

  const year = new Date();
  const date = `24 Dec ${year.getFullYear()} 23:59:59 GMT-0300`;
  const count = useCountdown(date, 1000);

  const getProducts = React.useCallback(async () => {
    dataProduct.total = '2';
    dataProduct.actualPage = '1';
    const { url, options } = PRODUCTS_GET_BY_CATEGORY(dataProduct);
    await request(url, options);
  }, [dataProduct, request]);

  React.useEffect(() => {
    if (refContent.current) {
      const position = refContent.current.offsetTop - window.innerHeight;
      setPosition(position);
    }
    if (shouldFetchData) getProducts();
  }, [getProducts, shouldFetchData, setPosition]);

  if (count.days < 1 && count.minutes < 1 && count.seconds === 1) return null;
  if (data && !data.length) return null;
  return (
    <div className={styles['promotion-container']} ref={refContent}>
      <div className={styles['promotion-info']}>
        <b>{product} Em Promoção!</b>
        <span>Aproveite as melhores ofertas. Já está acabando!</span>
        <p className={styles.time}>
          {count.days} : {count.hours} : {count.minutes} : {count.seconds}
        </p>
      </div>
      <ul className={styles['promotion-content']}>
        {data
          ? data.map(({ nome, preco, fotos, slug, categoria }) => (
              <li key={slug}>
                <Link to={`produto/${categoria}/${slug}`}>
                  <picture>
                    <Image alt={fotos[0].titulo} src={fotos[0].src} />
                  </picture>
                </Link>
                <div className={styles['product-infos']}>
                  <Link to={`produto/${categoria}/${slug}`}>
                    {nome.length >= 30 ? `${nome.slice(0, 30)}...` : nome}
                  </Link>
                  <b>R$ {preco}</b>
                </div>
              </li>
            ))
          : Array(2)
              .fill()
              .map((e, i) => (
                <Skeleton key={i} style={{ minWidth: '12rem', minHeight: '8rem' }} />
              ))}
      </ul>
    </div>
  );
};

export default HomePromotion;
