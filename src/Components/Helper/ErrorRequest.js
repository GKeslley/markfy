import React from 'react';
import { ReactComponent as LogoImg } from '../../Assets/shoppingBagIcon.svg';
import styles from '../../Css/Helper/ErrorRequest.module.css';

const ErrorRequest = ({ children }) => {
  return (
    <div className={styles.error}>
      <picture>
        <LogoImg />
      </picture>
      <p>{children}</p>
    </div>
  );
};

export default ErrorRequest;
