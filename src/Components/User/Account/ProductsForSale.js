import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import { PRODUCTS_GET } from '../../../Api/api';
import styles from '../../../Css/User/ProductsForSale.module.css';
import { Link, useNavigate } from 'react-router-dom';
import usePagination from '../../../Hooks/usePagination';
import Pagination from '../../Reusable/Pagination';
import ProductsForSaleSkeleton from '../../Skeletons/ProductsForSaleSkeleton';
import Image from '../../Helper/Image';

const ProductsForSale = ({ username }) => {
  const { request, data } = useFetch();
  const { actualPage, setTotalItems, totalItems, maxPage } = usePagination(20);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getProducts = async () => {
      const { url, options } = PRODUCTS_GET({
        page: actualPage,
        total: '20',
        user: username,
      });
      const { response } = await request(url, options);

      const total = response.headers.get('x-total-count');
      setTotalItems(total);
    };
    getProducts();
  }, [request, username, navigate, actualPage, setTotalItems]);

  if (!data) return <ProductsForSaleSkeleton />;
  return (
    <>
      <div className={styles.product}>
        <h1>{totalItems} Produtos</h1>
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

export default ProductsForSale;
