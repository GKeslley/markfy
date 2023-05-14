import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Css/ReusablesCss/Dropdown.module.css';
import useOutsideClick from '../../Hooks/useOutsideClick';
import {
  allCategories,
  toEndpoint,
} from '../User/PostProducts/CategoryPage/allCategories';

const Dropdown = () => {
  const refDropdown = React.useRef();
  const categories = allCategories();

  const [activeIndex, setActiveIndex] = React.useState(null);

  const activeDropdown = ({ target }) => {
    target.parentElement.classList.add('active');
  };

  const openSubcategories = (index) => {
    setActiveIndex(index);
  };

  useOutsideClick(refDropdown, () => refDropdown.current.classList.remove('active'));

  return (
    <li className={styles.dropdownContent} onClick={activeDropdown} ref={refDropdown}>
      <p>Categorias</p>
      <ul className={styles.dropdown}>
        {categories.map(({ name, subcategories, endpoint }, i) => (
          <li onClick={() => openSubcategories(i)} key={endpoint}>
            {subcategories.length ? (
              <div
                className={`${styles.dropdownItens} ${activeIndex === i ? 'active' : ''}`}
              >
                <p>{name}</p>
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
              <Link style={{ padding: '0 1rem 1rem 1rem' }} to={`produtos/${endpoint}`}>
                {name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Dropdown;
