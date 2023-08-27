import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import { PRODUCTS_SOLD_GET } from '../../../Api/api';
import styles from '../../../Css/User/ProductsForSale.module.css';
import usePagination from '../../../Hooks/usePagination';
import Pagination from '../../Reusable/Pagination';
import ProductsForSaleSkeleton from '../../Skeletons/ProductsForSaleSkeleton';
import Image from '../../Helper/Image';
import { Link } from 'react-router-dom';
import ErrorRequest from '../../Helper/ErrorRequest';

const ProductsSold = ({ username }) => {
  const maxTotalProducts = 20;
  const { request, data, loading, error } = useFetch();
  const { actualPage, setTotalItems, totalItems, maxPage } =
    usePagination(maxTotalProducts);

  React.useEffect(() => {
    const getProducts = async () => {
      const { url, options } = PRODUCTS_SOLD_GET({
        page: actualPage,
        total: maxTotalProducts,
        user: username,
      });
      const { response } = await request(url, options);

      const total = response.headers.get('x-total-count');
      setTotalItems(total);
    };
    getProducts();
  }, [request, username, actualPage, setTotalItems]);

  console.log(data);

  if (loading) return <ProductsForSaleSkeleton />;
  if (error) return <ErrorRequest>{error}</ErrorRequest>;
  if (!data) return null;
  return (
    <>
      <div className={styles.product}>
        <h1>
          {totalItems} {totalItems > 1 ? 'Produtos' : 'Produto'}
        </h1>
        <ul className={styles['products-content']}>
          {data.map(({ preco, fotos, slug, categoria }) => (
            <li key={slug}>
              <Link to={`/produto/${categoria}/${slug}`}>
                <picture>
                  {fotos && <Image alt="Imagem de produto" src={fotos[0].src} />}
                </picture>
                <span className={styles.price}>R$ {preco}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Pagination maxPage={maxPage} actualPage={actualPage} />
      </div>
    </>
  );
};

export default ProductsSold;
