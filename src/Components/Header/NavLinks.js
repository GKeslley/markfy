import React from 'react';
import Dropdown from '../Reusable/Dropdown';
import styles from '../../Css/Header/NavLinks.module.css';

const NavLinks = ({ customMobileStyle }) => {
  return (
    <ul className={customMobileStyle ? customMobileStyle : styles.nav}>
      <div className={`${styles.navElements}`}>
        <div className="container flexAlign">
          <li className={styles.navItem}>
            <Dropdown />
          </li>
          <li className={styles.navItem}>Meus anúncios</li>
          <li className={styles.navItem}>Vender</li>
        </div>
      </div>
    </ul>
  );
};

export default NavLinks;
