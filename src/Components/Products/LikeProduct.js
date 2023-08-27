import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import styles from '../../Css/Products/Product.module.css';
import { GlobalContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import { LIKE_PRODUCT_GET, LIKE_PRODUCT_POST } from '../../Api/api';
import RequestMessage from '../Reusable/RequestMessage';
import useUnlikeProduct from '../../Hooks/useUnlikeProduct';
import Spinner from '../Reusable/Spinner';
import { useNavigate } from 'react-router-dom';

const LikeProduct = ({ slug }) => {
  const { userData } = React.useContext(GlobalContext);
  const [isLiked, setIsLiked] = React.useState(false);
  const [notification, setNotification] = React.useState({ error: false, message: '' });
  const { getFavoriteProducts } = React.useContext(GlobalContext);
  const { request, loading } = useFetch();
  const {
    unlikeProduct,
    loading: unlikeLoading,
    error,
  } = useUnlikeProduct({
    getFavoriteProducts,
  });
  const navigate = useNavigate();

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
    if (!userData) {
      navigate('/login');
      return null;
    }
    if (!isLiked) {
      const body = { slug, usuario_id: userData.usuario_id };
      const { url, options } = LIKE_PRODUCT_POST({ body, token });
      const { response } = await request(url, options);
      if (response.ok) {
        getFavoriteProducts();
        setIsLiked(true);
        setNotification({ error: false, message: 'Produto favoritado com sucesso' });
      }
      return null;
    }
    await unlikeProduct(slug);
    setIsLiked(false);
    setNotification({ error: false, message: 'Produto desfavoritado com sucesso' });
  };

  if (error && !notification.error) {
    setNotification({ error: true, message: 'Erro ao realizar a ação, tente novamente' });
  }
  return (
    <>
      {notification.message && (
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
