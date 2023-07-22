import React from 'react';
import { GlobalContext } from '../../../Hooks/UserContext';
import styles from '../../../Css/User/Favorites.module.css';
import { BiStore } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import useUnlikeProduct from '../../../Hooks/useUnlikeProduct';
import useMedia from '../../../Hooks/useMedia';

const Favorites = () => {
  const { favoriteProducts, getFavoriteProducts } = React.useContext(GlobalContext);
  const { unlikeProduct } = useUnlikeProduct({ getFavoriteProducts });
  const mobileMatch = useMedia('(max-width: 600px)');

  if (favoriteProducts === false) return <p>N tem itens</p>;
  if (!favoriteProducts) return null;
  return (
    <section className={`${styles.productsContent} container`}>
      <h1>Favoritos</h1>
      {favoriteProducts.length ? (
        <div>
          <ul className={styles.sections}>
            <li>Produto</li>
            <li className={styles.price}>Preço</li>
            <li className={styles.remove}>Remover</li>
          </ul>
          <ul className={styles.product}>
            {favoriteProducts.map(({ produtos }) => (
              <li key={produtos.slug}>
                <Link className={styles.user} to={`/usuario/${produtos.usuario_id}`}>
                  <BiStore />
                  <p>{produtos.nome_usuario}</p>
                </Link>

                {!mobileMatch ? (
                  <div className={styles.productItems}>
                    <div className={styles.productInfos}>
                      <picture>
                        <img src={produtos.fotos[0].src} alt={produtos.fotos[0].titulo} />
                      </picture>

                      <p>{`${produtos.nome.slice(0, 40)}...`}</p>
                    </div>

                    <p className={styles.price}>R$ {produtos.preco}</p>
                    <p
                      onClick={() => unlikeProduct(produtos.slug)}
                      className={styles.remove}
                    >
                      <AiFillHeart />
                    </p>
                  </div>
                ) : (
                  <div className={styles.productItems}>
                    <div className={styles.productInfos}>
                      <picture>
                        <img src={produtos.fotos[0].src} alt={produtos.fotos[0].titulo} />
                      </picture>

                      <div className={styles['product-infos-mobile']}>
                        <p>{`${produtos.nome.slice(0, 40)}...`}</p>
                        <p className={styles.price}>R$ {produtos.preco}</p>
                      </div>

                      <p
                        onClick={() => unlikeProduct(produtos.slug)}
                        className={styles.remove}
                      >
                        <AiFillHeart />
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        'Voce nao possui itens favoritos'
      )}
    </section>
  );
};

export default Favorites;
