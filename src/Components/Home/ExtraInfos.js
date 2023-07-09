import React from 'react';
import styles from '../../Css/Home/ExtraInfos.module.css';
import { FaGift, FaTruck, FaBroadcastTower } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
const ExtraInfos = () => {
  return (
    <ul className={`container`}>
      <div className={styles.extraInfos}>
        <li className={styles.extraInfosItem}>
          <div>
            <picture>
              <FaTruck fill="#a8a8a8" />
            </picture>
            <div>
              <p className={styles['extraInfosItem-title']}>FRETE GRÁTIS</p>
              <p>Produtos com frete grátis</p>
            </div>
          </div>
        </li>
        <li className={styles.extraInfosItem}>
          <div>
            <picture>
              <RiMoneyDollarCircleFill fill="#a8a8a8" />
            </picture>
            <div>
              <p className={styles['extraInfosItem-title']}>GARANTIA</p>
              <p>Garantia de 30 dias em qualquer produto</p>
            </div>
          </div>
        </li>
        <li className={styles.extraInfosItem}>
          <div>
            <picture>
              <FaBroadcastTower fill="#a8a8a8" />
            </picture>
            <div>
              <p className={styles['extraInfosItem-title']}>SUPORTE ONLINE 24/7</p>
              <p>Ligue-nos: +55 71 9999-999</p>
            </div>
          </div>
        </li>
      </div>
    </ul>
  );
};

export default ExtraInfos;
