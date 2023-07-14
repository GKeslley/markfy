import React from 'react';
import useFetch from './useFetch';
import { UNLIKE_PRODUCT } from '../Api/api';

const useUnlikeProduct = ({ getFavoriteProducts }) => {
  const { request, loading, error } = useFetch();
  const unlikeProduct = React.useCallback(
    async (slug) => {
      const token = localStorage.getItem('token');
      if (token) {
        const { url, options } = UNLIKE_PRODUCT({ slug, token });
        const { response, json } = await request(url, options);
        console.log(response, json);
        if (response.ok) {
          getFavoriteProducts();
        }
      }
    },
    [request, getFavoriteProducts],
  );

  return { unlikeProduct, loading, error };
};

export default useUnlikeProduct;
