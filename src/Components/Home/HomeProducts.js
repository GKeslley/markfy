import React from 'react';
import useFetch from '../../Hooks/useFetch';
import useMedia from '../../Hooks/useMedia';
import { PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY } from '../../Api/api';
import styles from '../../Css/Home/Smartphones.module.css';
import { Link } from 'react-router-dom';
import Image from '../Helper/Image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IoIosArrowForward } from 'react-icons/io';
import ScrollTriggeredRequestComponent from '../../Hooks/useScrollApiRequest';
import Carousel from '../Reusable/Carousel';

const HomeProducts = ({ title, dataProduct }) => {
  const { request, data } = useFetch();
  const carouselRef = React.useRef();
  const contentRef = React.useRef();
  const mobileScreen = useMedia('(max-width: 830px)');
  const { shouldFetchData, setPosition } = ScrollTriggeredRequestComponent();

  const getProducts = React.useCallback(async () => {
    dataProduct.user = '@Markfyb894a46c';
    const { url, options } = PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY(dataProduct);
    request(url, options);
  }, [request, dataProduct]);

  React.useEffect(() => {
    if (contentRef.current) {
      const position = contentRef.current.offsetTop - window.innerHeight;
      setPosition(position);
    }
    if (shouldFetchData) getProducts();
  }, [getProducts, setPosition, shouldFetchData]);

  const handleLeftClick = () => {
    carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth + 16;
  };

  const handleRightClick = () => {
    const carousel = carouselRef.current;
    carousel.scrollLeft += carousel.offsetWidth;
  };

  const renderProduct = (product) => (
    <li key={`${product.id}-${Math.random().toString()}`}>
      <Link to={`produto/${product.categoria}/${product.id}`}>
        <picture>
          <Image alt={product.fotos[0].titulo} src={product.fotos[0].src} />
        </picture>
        <span>R$ {product.preco}</span>
        <p>{product.nome.slice(0, 30).trim()}...</p>
      </Link>
    </li>
  );

  return (
    <article>
      <div className={styles['products-content']} ref={contentRef}>
        <div className={styles.buttons}>
          <span className={styles['button-left']} onClick={handleLeftClick}>
            <IoIosArrowForward />
          </span>
          <span className={styles['button-right']} onClick={handleRightClick}>
            <IoIosArrowForward />
          </span>
        </div>

        <div className={styles['products-container']}>
          <div className={styles['products-title']}>
            <p>{title}</p>
            <picture>
              <IoIosArrowForward />
            </picture>
          </div>

          <ul className={`${styles.products}`} ref={carouselRef}>
            {data ? (
              <>
                {!mobileScreen ? (
                  data.map(renderProduct)
                ) : (
                  <Carousel refCarousel={carouselRef}>{data.map(renderProduct)}</Carousel>
                )}
              </>
            ) : (
              <Skeleton count={4} containerClassName={styles.skeleton} />
            )}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default HomeProducts;
