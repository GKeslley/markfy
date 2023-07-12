import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LIKE_PRODUCTS_GET, LOGIN_USER_POST, USER_GET, VALIDATE_TOKEN } from '../Api/api';
import useFetch from './useFetch';

export const GlobalContext = React.createContext();

export const UserContext = ({ children }) => {
  const navigate = useNavigate();
  const { request, loading, error } = useFetch();
  const [userData, setUserData] = React.useState(null);
  const [favoriteProducts, setFavoriteProducts] = React.useState(null);

  console.log(userData);
  const userLogin = async (email, password) => {
    const { url, options } = LOGIN_USER_POST({
      username: email,
      password: password,
    });
    const register = await request(url, options);
    if (register.response.ok) {
      localStorage.setItem('token', register.json.token);
      await getUser(localStorage.getItem('token'));
      navigate('/');
    }
  };

  const getUser = React.useCallback(
    async (token) => {
      const { url, options } = USER_GET(token);
      const getUser = await request(url, options);
      if (getUser.response.ok) {
        setUserData(getUser.json);
      }
    },
    [request],
  );

  const getFavoriteProducts = React.useCallback(async () => {
    const { url, options } = LIKE_PRODUCTS_GET({ user: userData.usuario_id });
    const response = await request(url, options);
    if (response.response.ok) {
      setFavoriteProducts(response.json);
    }
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
        try {
          const { url, options } = VALIDATE_TOKEN(token);
          const validate = await request(url, options);
          if (!validate.response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (Error) {
          userLogout();
        }
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
