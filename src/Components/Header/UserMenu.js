import React from 'react';
import styles from '../../Css/Header/UserMenu.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as UserImg } from '../../Assets/user-svgrepo-com.svg';
import CartMenu from './CartMenu';

const UserMenu = ({ nameUser, mobileMatch, customMobileStyle }) => {
  return (
    <ul className={customMobileStyle ? customMobileStyle : styles.sectionsContent}>
      <li>{!mobileMatch && <CartMenu mobileMatch={mobileMatch} />}</li>

      <li>
        {nameUser ? (
          <Link to="/conta" className="user">
            <UserImg />
            {nameUser}
          </Link>
        ) : (
          <Link to="/login">Login/Criar</Link>
        )}
      </li>
    </ul>
  );
};

export default UserMenu;
