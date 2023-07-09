import React from 'react';
import styles from '../../Css/Header/Logo.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImg } from '../../Assets/shoppingBagIcon.svg';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <LogoImg />
        <p>MARKFY</p>
      </Link>
    </div>
  );
};

export default Logo;
