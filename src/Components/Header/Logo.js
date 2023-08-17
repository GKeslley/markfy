import React from 'react';
import styles from '../../Css/Header/Logo.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImg } from '../../Assets/shoppingBagIcon.svg';

const Logo = ({ className }) => {
  return (
    <Link to="/" className={`${styles.logo} ${className ? className : ''}`}>
      <LogoImg />
      <p>MARKFY</p>
    </Link>
  );
};

export default Logo;
