import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../Css/ReusablesCss/Dropdown.module.css';
import useOutsideClick from '../../Hooks/useOutsideClick';
import { allCategories } from '../User/PostProducts/CategoryPage/allCategories';
import { IoIosArrowForward } from 'react-icons/io';

const Dropdown = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const refDropdown = React.useRef();
  const categories = allCategories();
  const navigate = useNavigate();

  const activeDropdown = ({ target }) => {
    target.parentElement.classList.toggle('active');
  };

  const closeDropdown = () => {
    refDropdown.current.classList.remove('active');
    setActiveIndex(null);
  };

  const openSubcategories = (index) => {
    setActiveIndex(index);
  };

  const handleEnterPage = (event) => {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    closeDropdown();
    navigate(href);
  };

  useOutsideClick(refDropdown, () => closeDropdown());

  return (
    <div
      className={styles['dropdown-content']}
      onClick={activeDropdown}
      ref={refDropdown}
    >
      <p>Categorias</p>
      <ul className={styles.dropdown}>
        {categories.map(({ name, subcategories, endpoint }, i) => (
          <li onClick={() => openSubcategories(i)} key={endpoint}>
            {subcategories.length ? (
              <div
                className={`${styles['dropdown-itens']} ${
                  activeIndex === i ? 'active' : ''
                }`}
              >
                <div className={styles['subcategorie-name']}>
                  <p>{name}</p>
                  <IoIosArrowForward fill="#fff" />
                </div>
                <ul className={styles['subcategories-content']}>
                  {subcategories.map(
                    ({ name: subcategorieName, endpoint: subcategorieEndpoint }) => (
                      <li key={subcategorieName}>
                        <Link
                          to={`produtos/${endpoint}/${subcategorieEndpoint}`}
                          onClick={handleEnterPage}
                        >
                          {subcategorieName}
                        </Link>
                      </li>
                    ),
                  )}
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
