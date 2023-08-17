import React from 'react';
import Subcategory from './Subcategory';
import styles from '../../../../Css/User/ProductCategory.module.css';
import { allCategories } from './allCategories';
import { useNavigate } from 'react-router-dom';

const ProductCategory = ({ setCategory, category, setSubcategory }) => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const categories = allCategories();
  const navigate = useNavigate();

  const handleClick = (index, newUrl = null) => {
    setActiveIndex(index);
    setCategory(categories[index]);
    if (newUrl) navigate(newUrl);
  };

  React.useEffect(() => {
    setSubcategory(null);
  }, [category, setSubcategory]);

  return (
    <section className={`${styles['categories-container']} animeLeft container`}>
      <h1>O que você está anunciando?</h1>
      <div className={styles['categories-content']}>
        <p>Categorias*</p>
        <ul className={styles.categories}>
          {categories.map(({ name, subcategories }, i) => (
            <>
              {subcategories.length ? (
                <li
                  key={i}
                  className={`${styles.category} ${activeIndex === i ? 'active' : ''} ${
                    styles.arrow
                  }                 
              `}
                  onClick={() => handleClick(i)}
                >
                  <div>
                    <p>{name}</p>
                  </div>

                  <Subcategory
                    subcategories={subcategories}
                    setSubcategory={setSubcategory}
                    active={activeIndex === i}
                  />
                </li>
              ) : (
                <li
                  key={name}
                  className={`${styles['category-link']}`}
                  onClick={() => handleClick(i, '../form')}
                >
                  <div>
                    <p>{name}</p>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductCategory;
