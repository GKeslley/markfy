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
import Spinner from '../../Reusable/Spinner';

const Favorites = () => {
  const [index, setIndex] = React.useState(null);
  const { favoriteProducts, getFavoriteProducts } = React.useContext(GlobalContext);
  const { unlikeProduct, loading } = useUnlikeProduct({ getFavoriteProducts });
  const mobileMatch = useMedia('(max-width: 600px)');

  const unlike = (slug, i) => {
    setIndex(i);
    unlikeProduct(slug);
  };

  if (favoriteProducts === false) return <p>N tem itens</p>;
  if (!favoriteProducts) return <FavoritesSkeleton />;
  return (
    <main className={`${styles['products-content']} container`}>
      <h1>Favoritos</h1>
      {favoriteProducts.length && (
        <div>
          <ul className={styles['product-section']}>
            <li>Produto</li>
            <li className={styles.price}>Preço</li>
            <li className={styles.remove}>Remover</li>
          </ul>
          <ul className={styles.product}>
            {favoriteProducts.map(({ produtos }, i) => (
              <li key={produtos.slug}>
                <Link className={styles.user} to={`/usuario/${produtos.usuario_id}`}>
                  <BiStore />
                  <p>{produtos.nome_usuario}</p>
                </Link>

                {!mobileMatch ? (
                  <div className={styles['product-items']}>
                    <div
                      className={`${styles['product-infos']} ${
                        produtos.vendido === 'true' ? styles.sell : ''
                      }`}
                    >
                      <picture>
                        <Image
                          alt={produtos.fotos[0].titulo}
                          src={produtos.fotos[0].src}
                        />
                      </picture>

                      <Link
                        to={`/produto/${produtos.categoria}/${produtos.slug}`}
                      >{`${produtos.nome.slice(0, 40)}...`}</Link>
                    </div>

                    <p className={styles.price}>R$ {produtos.preco}</p>
                    {loading && i === index ? (
                      <Spinner />
                    ) : (
                      <p
                        onClick={() => unlike(produtos.slug, i)}
                        className={styles.remove}
                      >
                        <AiFillHeart />
                      </p>
                    )}
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
    </main>
  );
};

export default Favorites;
