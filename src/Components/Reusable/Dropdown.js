import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Css/ReusablesCss/Dropdown.module.css';
import useOutsideClick from '../../Hooks/useOutsideClick';
import {
  allCategories,
  toEndpoint,
} from '../User/PostProducts/CategoryPage/allCategories';
import { IoIosArrowForward } from 'react-icons/io';

const Dropdown = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const refDropdown = React.useRef();
  const categories = allCategories();

  const activeDropdown = ({ target }) => {
    target.parentElement.classList.toggle('active');
  };

  const openSubcategories = (index) => {
    setActiveIndex(index);
  };

  useOutsideClick(refDropdown, () => {
    refDropdown.current.classList.remove('active');
    setActiveIndex(null);
  });

  return (
    <div className={styles.dropdownContent} onClick={activeDropdown} ref={refDropdown}>
      <p>Categorias</p>
      <ul className={styles.dropdown}>
        {categories.map(({ name, subcategories, endpoint }, i) => (
          <li onClick={() => openSubcategories(i)} key={endpoint}>
            {subcategories.length ? (
              <div
                className={`${styles.dropdownItens} ${activeIndex === i ? 'active' : ''}`}
              >
                <div className={styles.subcategorieName}>
                  <p>{name}</p>
                  <IoIosArrowForward fill="#fff" />
                </div>
                <ul className={styles.subcategoriesContent}>
                  {subcategories.map((title) => (
                    <li key={title}>
                      <Link to={`produtos/${endpoint}/${toEndpoint(title)}`}>
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link to={`produtos/${endpoint}`}>{name}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
