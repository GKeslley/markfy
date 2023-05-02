import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Css/Header.module.css';
import { GlobalContext } from '../Hooks/UserContext';

const Header = () => {
  const globalContext = React.useContext(GlobalContext);
  const { userData } = globalContext;
  const nameUser = userData && userData['nome'];

  return (
    <>
      {userData && (
        <header className={`${styles.header}`}>
          <nav className="container">
            <picture>
              <p>Markfy</p>
            </picture>
            <ul>
              <li>Carrinho</li>
              <li>
                <p>img</p>
                {nameUser ? (
                  <Link to="/conta">{nameUser}</Link>
                ) : (
                  <Link to="/login">Login/Criar</Link>
                )}
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
