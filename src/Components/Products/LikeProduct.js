import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import styles from '../../Css/Products/Product.module.css';
import { GlobalContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import { LIKE_PRODUCT_GET, LIKE_PRODUCT_POST } from '../../Api/api';
import RequestMessage from '../Reusable/RequestMessage';
import useUnlikeProduct from '../../Hooks/useUnlikeProduct';
import Spinner from '../Reusable/Spinner';

const LikeProduct = ({ slug, userID }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const { getFavoriteProducts } = React.useContext(GlobalContext);

  const { request, loading } = useFetch();
  const { unlikeProduct, loading: unlikeLoading } = useUnlikeProduct({
    getFavoriteProducts,
  });

  const token = localStorage.getItem('token');

  React.useEffect(() => {
    const productIsLiked = async () => {
      const { url, options } = LIKE_PRODUCT_GET({ slug, token });
      const { response } = await request(url, options);
      if (response.ok) {
        setIsLiked(true);
      }
    };
    productIsLiked();
  }, [request, slug, token]);

  const saveProduct = async () => {
    if (!isLiked) {
      const body = { slug, usuario_id: userID };
      const { url, options } = LIKE_PRODUCT_POST({ body, token });
      const { response, json } = await request(url, options);
      console.log(response, json);
      if (response.ok) {
        getFavoriteProducts();
        setIsLiked(true);
        setNotification('Produto favoritado com sucesso');
      }
      return null;
    }
    await unlikeProduct(slug);
    setIsLiked(false);
    setNotification('Produto desfavoritado com sucesso');
  };

  return (
    <>
      {notification && (
        <RequestMessage notification={notification} setNotification={setNotification} />
      )}
      <picture
        className={`${styles['product-like']} ${isLiked ? 'active' : ''} ${
          unlikeLoading || loading ? 'rotate' : ''
        }`}
        title="Favoritar"
        onClick={saveProduct}
      >
        {unlikeLoading || loading ? <Spinner width="8px" /> : <AiOutlineHeart />}
      </picture>
    </>
  );
};

export default LikeProduct;
