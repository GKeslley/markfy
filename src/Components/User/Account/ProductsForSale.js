import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import { PRODUCTS_GET } from '../../../Api/api';
import styles from '../../../Css/User/ProductsForSale.module.css';
import { Link, useNavigate } from 'react-router-dom';
import usePagination from '../../../Hooks/usePagination';
import Pagination from '../../Reusable/Pagination';

const ProductsForSale = ({ username }) => {
  const { request, data } = useFetch();
  const { actualPage, totalPages, setTotalPages, newUrl, handlePageAnt, handlePageProx } =
    usePagination();
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
      const totalItensPerPage = 20;
      const isInt = Number.isInteger(+total / totalItensPerPage);
      setTotalPages({
        pages: isInt
          ? +total / totalItensPerPage
          : Math.floor(+total / totalItensPerPage) + 1,
        totalItens: total,
      });
    };
    getProducts();
    navigate(newUrl);
  }, [request, username, setTotalPages, navigate, newUrl, actualPage]);

  return (
    <>
      {data && (
        <div className={styles.product}>
          <h1>{totalPages.totalItens} Produtos</h1>
          <ul className={styles.productsContent}>
            {data.map(({ preco, fotos, slug, categoria }) => (
              <li key={slug}>
                <Link to={`/produto/${categoria}/${slug}`}>
                  <picture>
                    {fotos && <img src={fotos[0].src} alt="Imagem de produto" />}
                  </picture>
                  <span className={styles.price}>R$ {preco}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination
            handlePageAnt={handlePageAnt}
            handlePageProx={handlePageProx}
            totalPages={totalPages}
            actualPage={actualPage}
          />
        </div>
      )}
    </>
  );
};

export default ProductsForSale;
