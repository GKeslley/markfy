import React from 'react';
import styles from '../../../Css/Header/Mobile/Categories.module.css';
import { allCategories } from '../../User/PostProducts/CategoryPage/allCategories';
import { Link } from 'react-router-dom';
import Carousel from '../../Reusable/Carousel';

const Categories = ({ handleOpenMenu }) => {
  const categories = allCategories();
  const refCarousel = React.useRef();

  return (
    <section className={styles.carouselContent}>
      <Carousel refCarousel={refCarousel}>
        {categories.map(({ name, endpoint, img }) => (
          <Link key={name} to={`/produtos/${endpoint}`} onClick={handleOpenMenu}>
            <picture>{img.src}</picture>
            <p>{name}</p>
          </Link>
        ))}
      </Carousel>
    </section>
  );
};

export default Categories;
