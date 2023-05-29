import React from 'react';
import Dropdown from '../Reusable/Dropdown';
import styles from '../../Css/Header/NavLinks.module.css';

const NavLinks = ({ customMobileStyle }) => {
  return (
    <ul className={customMobileStyle ? customMobileStyle : styles.nav}>
      <div className="container flexAlign">
        <Dropdown />
        <li>Meus anúncios</li>
        <li>Vender</li>
      </div>
    </ul>
  );
};

export default NavLinks;
