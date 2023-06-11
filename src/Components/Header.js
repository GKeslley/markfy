import React from 'react';
import styles from '../Css/Header.module.css';
import { GlobalContext } from '../Hooks/UserContext';
import Logo from './Header/Logo';
import Input from './Form/Input';
import UserMenu from './Header/UserMenu';
import NavLinks from './Header/NavLinks';
import MenuHamburger from './Header/MenuHamburger';
import useMedia from '../Hooks/useMedia';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { userData } = React.useContext(GlobalContext);
  const nameUser = userData && userData['nome'];
  const { pathname } = window.location;
  const navigate = useNavigate();

  const mobileMatch = useMedia('(max-width: 830px)');

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.children['0'].value;
    navigate('/produtos?q=' + value);
  };

  return (
    <>
      {!pathname.includes('login') && (
        <header className={`${styles.header}`}>
          <nav className="">
            <article className={styles.headerContent}>
              <div className={`${styles.headerItem} container`}>
                <Logo />
                <form action="" onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name="search"
                    className={styles.input}
                    placeholder="Procurar..."
                  />
                </form>
                {!mobileMatch ? (
                  <UserMenu nameUser={nameUser} mobileMatch={mobileMatch} />
                ) : (
                  <MenuHamburger nameUser={nameUser} mobileMatch={mobileMatch} />
                )}
              </div>
              {!mobileMatch && <NavLinks />}
            </article>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
