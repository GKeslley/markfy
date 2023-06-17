import React from 'react';
import { GlobalContext } from '../../../Hooks/UserContext';
import styles from '../../../Css/User/Favorites.module.css';
import { BiStore } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { BiTrashAlt } from 'react-icons/bi';
import useUnlikeProduct from '../../../Hooks/useUnlikeProduct';

const Favorites = () => {
  const { favoriteProducts, getFavoriteProducts } = React.useContext(GlobalContext);
  const { unlikeProduct } = useUnlikeProduct({ getFavoriteProducts });

  if (!favoriteProducts) return null;
  return (
    <section className={`${styles.productsContent} container`}>
      <h1>Favoritos</h1>
      {favoriteProducts.length ? (
        <div>
          <ul className={styles.sections}>
            <li>Produto</li>
            <li className={styles.price}>Preço</li>
            <li className={styles.quantity}>Quantidade</li>
            <li className={styles.remove}>Remover</li>
          </ul>
          <ul className={styles.product}>
            {favoriteProducts.map(({ produtos }) => (
              <li key={produtos.slug}>
                <Link className={styles.user} to={`/usuario/${produtos.usuario_id}`}>
                  <BiStore />
                  <p>{produtos.nome_usuario}</p>
                </Link>

                <div className={styles.productItems}>
                  <div className={styles.productInfos}>
                    <picture>
                      <img src={produtos.fotos[0].src} alt={produtos.fotos[0].titulo} />
                    </picture>

                    <p>{`${produtos.nome.slice(0, 40)}...`}</p>
                  </div>

                  <p className={styles.price}>R$ {produtos.preco}</p>
                  <p className={styles.quantity}>1</p>
                  <p
                    onClick={() => unlikeProduct(produtos.slug)}
                    className={styles.remove}
                  >
                    <BiTrashAlt />
                  </p>
                </div>
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
