import React from 'react';
import styles from '../../Css/Helper/Error404.module.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <section className={`${styles.error}`}>
      <div className="container">
        <h1>404</h1>
      </div>
      <div className={styles['error-bg']}>
        <p>Desculpe, Página Não Encontrada</p>
        <p>A página que você está procurando não foi encontrada</p>
        <Link to="/" className="button">
          Página Inicial
        </Link>
      </div>
    </section>
  );
};

export default Error404;
