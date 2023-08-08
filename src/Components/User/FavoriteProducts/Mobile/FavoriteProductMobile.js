import React from 'react';
import styles from '../../../../Css/User/Favorites.module.css';
import Image from '../../../Helper/Image';
import { AiFillHeart } from 'react-icons/ai';

const FavoriteProductMobile = ({ produtos, unlikeProduct }) => {
  return (
    <div className={styles['product-items']}>
      <div className={styles['product-infos']}>
        <picture className={`${produtos.vendido === 'true' ? styles.sell : ''}`}>
          <Image alt={produtos.fotos[0].titulo} src={produtos.fotos[0].src} />
        </picture>

        <div>
          <p>{`${produtos.nome.slice(0, 40)}...`}</p>
          <p className={styles.price}>R$ {produtos.preco}</p>
        </div>

        <p onClick={() => unlikeProduct(produtos.slug)} className={styles.remove}>
          <AiFillHeart />
        </p>
      </div>
    </div>
  );
};

export default FavoriteProductMobile;
