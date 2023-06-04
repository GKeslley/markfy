import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PRODUCTS_GET_BY_CATEGORY } from '../../Api/api';
import usePagination from '../../Hooks/usePagination';

const Products = () => {
  const { actualPage, totalPages, setTotalPages, newUrl, handlePageAnt, handlePageProx } =
    usePagination();

  const { request } = useFetch();

  const params = useParams();
  const navigate = useNavigate();

  const category = params.categoria;
  const subcategory = params['*'] ? params['*'] : null;

  React.useEffect(() => {
    const getProducts = async () => {
      console.log(actualPage);
      const { url, options } = PRODUCTS_GET_BY_CATEGORY({
        category,
        subcategory,
        actualPage,
      });
      const { response, json } = await request(url, options);
      console.log(json);
      const total = response.headers.get('x-total-count');
      const totalItensPerPage = 9;
      const isInt = Number.isInteger(+total / 9);
      setTotalPages(
        isInt ? +total / totalItensPerPage : Math.floor(+total / totalItensPerPage) + 1,
      );
    };

    getProducts();
    navigate(newUrl);
  }, [category, actualPage, subcategory, request, navigate, newUrl, setTotalPages]);

  return (
    <section className="container">
      <div>
        {actualPage <= totalPages && actualPage > 1 && (
          <p onClick={handlePageAnt}>Anterior</p>
        )}
        <p>{`${actualPage} de ${totalPages}`}</p>
        {actualPage !== totalPages && <p onClick={handlePageProx}>Próximo</p>}
      </div>
    </section>
  );
};

export default Products;
