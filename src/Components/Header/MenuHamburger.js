import React from 'react';
import UserMenu from './UserMenu';
import NavLinks from './NavLinks';
import styles from '../../Css/Header/MenuHamburger.module.css';
import CartMenu from './CartMenu';

const MenuHamburger = ({ nameUser, mobileMatch }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.navMenu}>
        <button className={styles.openMenu}>Menu</button>
        <CartMenu mobileMatch={mobileMatch} />
      </div>
      <div className={styles.menuContent}>
        <UserMenu
          nameUser={nameUser}
          customMobileStyle={styles.userMenu}
          mobileMatch={mobileMatch}
        />
        <NavLinks customMobileStyle={styles.navLinks} />
      </div>
    </div>
  );
};

export default MenuHamburger;
