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
import { Link } from 'react-router-dom';

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
            <Categories handleOpenMenu={handleOpenMenu} />
            <ul className={styles['nav-links']}>
              <li>
                <RxHome />
                <Link to="/" onClick={handleOpenMenu}>
                  Início
                </Link>
              </li>
              <li>
                <RxDashboard />
                <Link to="/conta/anuncios" onClick={handleOpenMenu}>
                  Meus Anúncios
                </Link>
              </li>
              <li>
                <AiOutlineTag />
                <Link to="/conta/produto/categoria" onClick={handleOpenMenu}>
                  Vender
                </Link>
              </li>
              <li>
                <BsBag />
                <p>Compras</p>
              </li>
              <li>
                <RxGear />
                <Link to="/conta/configuracoes" onClick={handleOpenMenu}>
                  Configurações
                </Link>
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
