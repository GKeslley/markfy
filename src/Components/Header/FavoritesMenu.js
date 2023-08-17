import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Css/Header/FavoritesMenu.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { GlobalContext } from '../../UserContext';

const FavoritesMenu = ({ mobileMatch }) => {
  const { favoriteProducts } = React.useContext(GlobalContext);

  return (
    <>
      <Link to="favoritos" className={styles.sections}>
        {!mobileMatch && <p>Favoritos</p>}
        <div className={styles.count}>
          <AiFillHeart />
          <span>{favoriteProducts ? favoriteProducts.length : '0'}</span>
        </div>
      </Link>
    </>
  );
};

export default FavoritesMenu;
