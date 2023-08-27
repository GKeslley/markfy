import React from 'react';
import styles from '../../Css/Home/HomeBanner.module.css';

const HomeBanner = () => {
  return (
    <div>
      <ul className={styles.banners}>
        <li>
          <span>Ofertas</span>
          <p>Aproveite As Melhores Oportunidades</p>
          <span>Selecione Seu Novo Smartphone</span>
        </li>
        <li>
          <span>Esportes</span>
          <p>Uma Vida Mais Saúdavel</p>
          <span>Objetos de Esportes</span>
        </li>
      </ul>
    </div>
  );
};

export default HomeBanner;
