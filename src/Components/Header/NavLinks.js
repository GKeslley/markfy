import React from 'react';
import Dropdown from '../Reusable/Dropdown';
import styles from '../../Css/Header/NavLinks.module.css';

const NavLinks = () => {
  return (
    <ul className={styles.nav}>
      <div className={`${styles['nav-elements']}`}>
        <div className="container flexAlign">
          <li>
            <Dropdown />
          </li>
          <li>Meus anúncios</li>
          <li>Vender</li>
        </div>
      </div>
    </ul>
  );
};

export default NavLinks;
