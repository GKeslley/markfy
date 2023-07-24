import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY } from '../../Api/api';
import styles from '../../Css/Home/Smartphones.module.css';
import { ReactComponent as BtnCarousel } from '../../Assets/arrowCarousel.svg';
import { Link } from 'react-router-dom';
import Image from '../Helper/Image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Smartphones = () => {
  const { request, data } = useFetch();
  const carouselRef = React.useRef();

  React.useEffect(() => {
    const getSmartphones = async () => {
      const { url, options } = PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY(
        'eletronicos',
        'celulares_e_telefones',
        '@Markfyb894a46c',
      );
      console.log('REQUEST SMARTPHONES');
      request(url, options);
    };
    getSmartphones();
  }, [request]);

  const handleLeftClick = () => {
    carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth + 16;
  };

  const handleRightClick = () => {
    const carousel = carouselRef.current;
    carousel.scrollLeft += carousel.offsetWidth;
  };

  return (
    <div className="container">
      <div className={styles.carouselContent}>
        <p>GARANTA SEU NOVO SMARTPHONE</p>
        <ul className={`${styles.smartphones} flexAlign`} ref={carouselRef}>
          {data ? (
            data.map((product) => (
              <li key={product.id + toString(Math.random())}>
                <Link to={`produto/${product.categoria}/${product.id}`}>
                  <picture>
                    <Image alt={product.fotos[0].titulo} src={product.fotos[0].src} />
                  </picture>
                  <span>R$ {product.preco}</span>
                  <p>{product.nome.slice(0, 30).trim()}...</p>
                </Link>
              </li>
            ))
          ) : (
            <Skeleton count={4} containerClassName={styles.skeleton} />
          )}
        </ul>
        <div className={styles.buttons}>
          <span className={styles.buttonLeft} onClick={handleLeftClick}>
            <BtnCarousel />
          </span>
          <span className={styles.buttonRight} onClick={handleRightClick}>
            <BtnCarousel />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Smartphones;
