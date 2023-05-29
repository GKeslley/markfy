import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Css/Header/CartMenu.module.css';
import { ReactComponent as CartImg } from '../../Assets/cartIcon.svg';

const CartMenu = ({ mobileMatch }) => {
  return (
    <>
      <Link to="carrinho" className={styles.sections}>
        {!mobileMatch && <p>Carrinho</p>}
        <CartImg />
      </Link>
    </>
  );
};

export default CartMenu;
