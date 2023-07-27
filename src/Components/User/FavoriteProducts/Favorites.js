import React from 'react';
import { GlobalContext } from '../../../UserContext';
import styles from '../../../Css/User/Favorites.module.css';
import { BiStore } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import useUnlikeProduct from '../../../Hooks/useUnlikeProduct';
import useMedia from '../../../Hooks/useMedia';
import FavoritesSkeleton from '../../Skeletons/FavoritesSkeleton';
import Image from '../../Helper/Image';
import FavoriteProductMobile from './Mobile/FavoriteProductMobile';

const Favorites = () => {
  const { favoriteProducts, getFavoriteProducts } = React.useContext(GlobalContext);
  const { unlikeProduct } = useUnlikeProduct({ getFavoriteProducts });
  const mobileMatch = useMedia('(max-width: 600px)');

  if (favoriteProducts === false) return <p>N tem itens</p>;
  if (!favoriteProducts) return <FavoritesSkeleton />;
  return (
    <section className={`${styles['products-content']} container`}>
      <h1>Favoritos</h1>
      {favoriteProducts.length && (
        <div>
          <ul className={styles['product-section']}>
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
                  <div className={styles['product-items']}>
                    <div className={styles['product-infos']}>
                      <picture>
                        <Image
                          alt={produtos.fotos[0].titulo}
                          src={produtos.fotos[0].src}
                        />
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
                  <FavoriteProductMobile
                    produtos={produtos}
                    unlikeProduct={unlikeProduct}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Favorites;
