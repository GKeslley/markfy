import React from 'react';
import Category from './Category';
import Subcategory from './Subcategory';
import styles from '../../../../Css/User/ProductCategory.module.css';
import { allCategories } from './allCategories';

const categories = allCategories();

const ProductCategory = ({ setCategory, category, setGetSubcategory }) => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
    setCategory(categories[index]);
  };

  React.useEffect(() => {
    setGetSubcategory(null);
  }, [category, setGetSubcategory]);

  return (
    <section className={`${styles.categoriesContainer} animeLeft`}>
      <h1>O que você está anunciando?</h1>
      <div>
        <p>Categorias*</p>
        <ul className={styles.categories}>
          {categories.map(({ name, subcategories }, i) => (
            <li
              key={name}
              className={`${styles.category} ${activeIndex === i ? 'active' : ''} ${
                subcategories.length ? 'link_item' : ''
              }`}
            >
              <div onClick={() => handleClick(i)}>
                <Category name={name} subcategories={subcategories} />
              </div>

              {subcategories.length > 0 && (
                <Subcategory
                  subcategories={subcategories}
                  setGetSubcategory={setGetSubcategory}
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
