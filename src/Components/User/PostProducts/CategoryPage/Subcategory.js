import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../../Css/User/Subcategory.module.css';

const Subcategory = ({ subcategories, setSubcategory, active }) => {
  const handleClick = (name, endpoint) => {
    const clearName = () => {
      setSubcategory({ subcategory: name, endpoint });
    };
    clearName();
  };

  return (
    <>
      <ul className={`${styles['subcategory']} ${active && 'active'}`}>
        {subcategories.length &&
          subcategories.map(({ name, endpoint }, i) => (
            <li
              key={name}
              title={name}
              className={`${styles['subcategory-title']}`}
              onClick={() => handleClick(name, endpoint)}
            >
              <Link to="../form">{name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Subcategory;
