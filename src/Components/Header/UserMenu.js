import React from 'react';
import styles from '../../Css/Header/UserMenu.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as UserImg } from '../../Assets/user-svgrepo-com.svg';
import FavoritesMenu from './FavoritesMenu';

const UserMenu = ({ username, mobileMatch }) => {
  return (
    <ul className={styles['user-menu-content']}>
      {!mobileMatch && (
        <li>
          <FavoritesMenu mobileMatch={mobileMatch} />
        </li>
      )}
      <li>
        {username ? (
          <Link to="/conta/perfil" className="user">
            <UserImg />
            <p>{username.length > 7 ? `${username.slice(0, 7)}...` : username}</p>
          </Link>
        ) : (
          <Link to="/login">Login/Criar</Link>
        )}
      </li>
    </ul>
  );
};

export default UserMenu;
