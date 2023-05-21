import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY } from '../../Api/api';
import styles from '../../Css/Home/Smartphones.module.css';
import { ReactComponent as BtnCarousel } from '../../Assets/arrowCarousel.svg';
import { useNavigate } from 'react-router-dom';

const Smartphones = ({ setDataProduct }) => {
  const { request, data } = useFetch();
  const carouselRef = React.useRef();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getSmartphones = async () => {
      const { url, options } = PRODUCTS_GET_BY_CATEGORY_SUBCATEGORY(
        'eletronicos',
        'celulares_e_telefones',
        '@MarkfyjXe27jXe',
      );
      console.log(url);
      const response = await request(url, options);
      console.log(response);
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

  const selectProduct = (product) => {
    setDataProduct(product);
    navigate(`produto/${product.categoria}/${product.id}`);
  };

  return (
    <div className="container">
      <div className={styles.carouselContent}>
        <p>GARANTA SEU NOVO SMARTPHONE</p>
        <ul className={`${styles.smartphones} flexAlign`} ref={carouselRef}>
          {data &&
            data.map((product) => (
              <li
                key={product.id + toString(Math.random())}
                onClick={() => selectProduct(product)}
              >
                <picture>
                  <img src={product.fotos[0].src} alt={product.fotos[0].titulo} />
                </picture>
                <span>R$ {product.preco}</span>
                <p>{product.nome.slice(0, 30).trim()}...</p>
              </li>
            ))}
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
