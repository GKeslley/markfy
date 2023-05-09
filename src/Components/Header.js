import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Css/Header.module.css';
import { GlobalContext } from '../Hooks/UserContext';
import { ReactComponent as Logo } from '../Assets/shoppingBagIcon.svg';
import { ReactComponent as Cart } from '../Assets/cartIcon.svg';
import { ReactComponent as User } from '../Assets/user-svgrepo-com.svg';
import Dropdown from './Reusable/Dropdown';

const Header = () => {
  const globalContext = React.useContext(GlobalContext);
  const { userData } = globalContext;
  const nameUser = userData && userData['nome'];
  const { pathname } = window.location;

  return (
    <>
      {!pathname.includes('login') && (
        <header className={`${styles.header}`}>
          <nav className="">
            <article className={styles.headerContent}>
              <div className={`${styles.headerItem} container`}>
                <div className={styles.logo}>
                  <Link to="/">
                    <Logo />
                    <p>Markfy</p>
                  </Link>
                </div>

                <input className={styles.input} type="text" name="search" id="search" />

                <ul className={styles.sectionsContent}>
                  <li>
                    <Link to="carrinho" className={styles.sections}>
                      <p>Carrinho</p>
                      <Cart />
                    </Link>
                  </li>

                  <li>
                    {nameUser ? (
                      <Link to="/conta" className={`${styles.sections} user`}>
                        <User />
                        {nameUser}
                      </Link>
                    ) : (
                      <Link to="/login">Login/Criar</Link>
                    )}
                  </li>
                </ul>
              </div>
              <ul className={styles.nav}>
                <div className={`${styles.headerItem} container flexAlign`}>
                  <Dropdown />
                  <li>Meus anúncios</li>
                  <li>Vender</li>
                </div>
              </ul>
            </article>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
