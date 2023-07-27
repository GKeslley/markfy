import React from 'react';
import UserMenu from './UserMenu';
import styles from '../../Css/Header/MenuHamburger.module.css';
import FavoritesMenu from './FavoritesMenu';
import Categories from './Mobile/Categories';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineTag } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import { RxGear } from 'react-icons/rx';
import { RxHome } from 'react-icons/rx';
import Button from '../Reusable/Button';

const MenuHamburger = ({ username, mobileMatch }) => {
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
    <ul className={styles['nav-menu']}>
      <li>
        <Button
          className={`${styles['open-menu']} ${activeMenu ? 'active' : ''}`}
          onClick={handleOpenMenu}
        >
          Menu
        </Button>
        {activeMenu && (
          <div className={styles['menu-content']}>
            <UserMenu username={username} mobileMatch={mobileMatch} />
            <Categories />
            <ul className={styles['nav-links']}>
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
      <FavoritesMenu mobileMatch={mobileMatch} />
    </ul>
  );
};

export default MenuHamburger;
