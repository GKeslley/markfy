import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Css/Header/CartMenu.module.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { GlobalContext } from '../../Hooks/UserContext';

const CartMenu = ({ mobileMatch }) => {
  const { favoriteProducts } = React.useContext(GlobalContext);

  return (
    <>
      <Link to="favoritos" className={styles.sections}>
        {!mobileMatch && <p>Favoritos</p>}
        <div className={styles.count}>
          <AiOutlineHeart />
          <span>{favoriteProducts && favoriteProducts.length}</span>
        </div>
      </Link>
    </>
  );
};

export default CartMenu;
