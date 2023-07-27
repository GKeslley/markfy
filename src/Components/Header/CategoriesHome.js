import React from 'react';
import styles from '../../Css/Home/CategoriesHome.module.css';
import { Link } from 'react-router-dom';

const CategoriesHome = () => {
  return (
    <article className={`${styles['categories-home']} container`}>
      <ul className={styles['categories-home-content']}>
        <li className={styles['categories-home-element']}>
          <div className={styles['categories-home-text']}>
            <span>Moda</span>
            <b>Vista-se & Curte-a</b>
            <p>Faça parte disso</p>
            <Link to="produtos/moda">Procurar</Link>
          </div>
        </li>
        <li className={styles['categories-home-element']}>
          <div className={styles['categories-home-text']}>
            <span>Saúde</span>
            <b>Cuide-se & Viva</b>
            <p>Aproveite-se</p>
            <Link to="produtos/saude">Procurar</Link>
          </div>
        </li>
        <li className={styles['categories-home-element']}>
          <div className={styles['categories-home-text']}>
            <span>Casa</span>
            <b>Arrume-se & Arrume-a</b>
            <p>Tudo Para Seu Lar</p>
            <Link to="produtos/casa">Procurar</Link>
          </div>
        </li>
      </ul>
    </article>
  );
};

export default CategoriesHome;
