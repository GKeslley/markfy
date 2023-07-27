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
    const fields = {
      category: 'eletronicos',
      subcategory: 'celulares_e_telefones',
      user: '@Markfyb894a46c',
    };
    const getSmartphones = async () => {
      const { url, options } = PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY(fields);
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

  if (!data) return <Skeleton count={4} containerClassName={styles.skeleton} />;
  return (
    <article className="container">
      <div className={styles['smartphone-content']}>
        <p>GARANTA SEU NOVO SMARTPHONE</p>
        <ul className={`${styles.smartphones} flexAlign`} ref={carouselRef}>
          {data.map((product) => (
            <li key={product.id + toString(Math.random())}>
              <Link to={`produto/${product.categoria}/${product.id}`}>
                <picture>
                  <Image alt={product.fotos[0].titulo} src={product.fotos[0].src} />
                </picture>
                <span>R$ {product.preco}</span>
                <p>{product.nome.slice(0, 30).trim()}...</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.buttons}>
          <span className={styles['button-left']} onClick={handleLeftClick}>
            <BtnCarousel />
          </span>
          <span className={styles['button-right']} onClick={handleRightClick}>
            <BtnCarousel />
          </span>
        </div>
      </div>
    </article>
  );
};

export default Smartphones;
