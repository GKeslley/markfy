import React from 'react';
import UserMenu from './UserMenu';
import styles from '../../Css/Header/MenuHamburger.module.css';
import CartMenu from './CartMenu';
import Categories from './Mobile/Categories';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineTag } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import { RxGear } from 'react-icons/rx';
import { RxHome } from 'react-icons/rx';

const MenuHamburger = ({ nameUser, mobileMatch }) => {
  const [activeMenu, setActiveMenu] = React.useState(false);
  const body = document.body;

  const handleOpenMenu = () => {
    setActiveMenu(!activeMenu);
  };

  if (activeMenu) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'initial';
  }

  return (
    <ul className={styles.navMenu}>
      <li>
        <button
          className={`${styles.openMenu} ${activeMenu ? 'active' : ''}`}
          onClick={handleOpenMenu}
        >
          Menu
        </button>
        {activeMenu && (
          <div className={styles.menuContent}>
            <UserMenu
              nameUser={nameUser}
              customMobileStyle={styles.userMenu}
              mobileMatch={mobileMatch}
            />
            <Categories />
            <ul className={styles.navLinks}>
              <li>
                <RxHome />
                <p>Início</p>
              </li>
              <li>
                <RxDashboard />
                <p>Meus Anúncios</p>
              </li>
              <li>
                <AiOutlineTag />
                <p>Vender</p>
              </li>
              <li>
                <BsBag />
                <p>Compras</p>
              </li>
              <li>
                <RxGear />
                <p>Configurações</p>
              </li>
            </ul>
          </div>
        )}
      </li>
      <CartMenu mobileMatch={mobileMatch} />
    </ul>
  );
};

export default MenuHamburger;
