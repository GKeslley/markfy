import React from 'react';
import Category from './Category';
import Subcategory from './Subcategory';
import styles from '../../../../Css/User/ProductCategory.module.css';
import { allCategories } from './allCategories';

const ProductCategory = ({ setCategory, category, setSubcategory }) => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const categories = allCategories();
  const handleClick = (index) => {
    setActiveIndex(index);
    setCategory(categories[index]);
  };

  React.useEffect(() => {
    setSubcategory(null);
  }, [category, setSubcategory]);

  return (
    <section className={`${styles['categories-container']} animeLeft`}>
      <h1>O que você está anunciando?</h1>
      <div>
        <p>Categorias*</p>
        <ul className={styles.categories}>
          {categories.map(({ name, subcategories }, i) => (
            <li
              key={name}
              className={`${styles.category} ${activeIndex === i ? 'active' : ''} ${
                subcategories.length ? styles['link_item'] : ''
              }      
              `}
            >
              <div onClick={() => handleClick(i)}>
                <Category name={name} subcategories={subcategories} />
              </div>

              {subcategories.length > 0 && (
                <Subcategory
                  subcategories={subcategories}
                  setSubcategory={setSubcategory}
                  active={activeIndex === i}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductCategory;
