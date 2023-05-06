import React from 'react';
import { PRODUCTS_GET } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';

const Products = () => {
  const { request } = useFetch();
  const [productsData, setProductsData] = React.useState(null);

  React.useEffect(() => {
    const allProducts = async () => {
      const { url, options } = PRODUCTS_GET({ page: 1, total: 8, user: '' });
      const response = await request(url, options);
      if (response.response.ok) {
        setProductsData(response.json);
      }
    };

    allProducts();
  }, [request]);
  console.log(productsData);

  return <div>Products</div>;
};

export default Products;
