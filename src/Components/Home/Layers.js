import React from 'react';
import styles from '../../Css/Home/Layers.module.css';
import { MdPayments } from 'react-icons/md';
import { IoTimeSharp } from 'react-icons/io5';
import { RiFilePaperFill } from 'react-icons/ri';
import { FaTruck } from 'react-icons/fa';

const Layers = () => {
  return (
    <ul className={`${styles.layer}`}>
      <li className={styles['layer-content']}>
        <div>
          <MdPayments />
          <p>Pagamento rápido e seguro</p>
        </div>
        <div>
          <FaTruck />
          <p>Frete grátis</p>
        </div>
      </li>
      <li className={styles['layer-content']}>
        <div>
          <RiFilePaperFill />
          <p>Garantia de 30 dias</p>
        </div>
        <div>
          <IoTimeSharp />
          <p>Disponível para você 24/7</p>
        </div>
      </li>
    </ul>
  );
};

export default Layers;
