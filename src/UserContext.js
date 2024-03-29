import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LIKE_PRODUCTS_GET, LOGIN_USER_POST, USER_GET, VALIDATE_TOKEN } from './Api/api';
import useFetch from './Hooks/useFetch';

export const GlobalContext = React.createContext();

export const UserContext = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [favoriteProducts, setFavoriteProducts] = React.useState(null);
  const { request, loading, error } = useFetch();
  const navigate = useNavigate();

  const userLogin = async (email, password) => {
    const { url, options } = LOGIN_USER_POST({
      username: email,
      password: password,
    });
    const { response, json } = await request(url, options);
    if (response.ok) {
      localStorage.setItem('token', json.token);
      await getUser(localStorage.getItem('token'));
      navigate('/');
    }
  };

  const getUser = React.useCallback(
    async (token) => {
      const { url, options } = USER_GET(token);
      const { response, json } = await request(url, options);
      if (response.ok) {
        setUserData(json);
      }
    },
    [request],
  );

  const getFavoriteProducts = React.useCallback(async () => {
    const { url, options } = LIKE_PRODUCTS_GET({ user: userData.usuario_id });
    const { response, json } = await request(url, options);
    if (!response.ok) {
      setFavoriteProducts(false);
      return response;
    }
    setFavoriteProducts(json);
    return response;
  }, [request, userData]);

  const userLogout = React.useCallback(() => {
    localStorage.removeItem('token');
    setUserData(null);
    navigate('/login');
  }, [navigate]);

  React.useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { url, options } = VALIDATE_TOKEN(token);
        const validate = await request(url, options);
        if (!validate.response.ok) throw new Error('Token inválido');
        await getUser(token);
      } else {
        navigate('/login');
      }
    };
    autoLogin();
  }, [request, userLogout, getUser, navigate]);

  React.useEffect(() => {
    if (userData) {
      getFavoriteProducts();
      console.log('puxou');
    }
  }, [getFavoriteProducts, userData]);

  return (
    <GlobalContext.Provider
      value={{
        userLogin,
        userData,
        userLogout,
        favoriteProducts,
        getFavoriteProducts,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
