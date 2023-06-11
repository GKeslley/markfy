import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import styles from '../../Css/Products/Product.module.css';
import { GlobalContext } from '../../Hooks/UserContext';
import useFetch from '../../Hooks/useFetch';
import { LIKE_PRODUCT_POST } from '../../Api/api';

const LikeProduct = ({ slug, userID }) => {
  const { request } = useFetch();
  const { getFavoriteProducts } = React.useContext(GlobalContext);

  const saveProduct = async () => {
    const token = localStorage.getItem('token');
    const body = { slug, usuario_id: userID };
    const { url, options } = LIKE_PRODUCT_POST({ body, token });
    const { response } = await request(url, options);
    if (response.ok) {
      getFavoriteProducts();
    }
  };

  return (
    <>
      <picture className={styles.productLike} title="Favoritar" onClick={saveProduct}>
        <AiOutlineHeart />
      </picture>
    </>
  );
};

export default LikeProduct;
