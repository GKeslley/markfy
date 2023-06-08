import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PRODUCTS_GET_BY_CATEGORY } from '../../Api/api';
import usePagination from '../../Hooks/usePagination';
import styles from '../../Css/Products/Products.module.css';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Select from '../Form/Select';

const Products = () => {
  const {
    actualPage,
    totalPages,
    setTotalPages,
    newUrl,
    handlePageAnt,
    handlePageProx,
    order,
    setOrder,
  } = usePagination();

  const { request, data } = useFetch();

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
        order,
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
  }, [
    category,
    actualPage,
    subcategory,
    request,
    navigate,
    newUrl,
    setTotalPages,
    order,
  ]);

  const handleSelectFilt = ({ target }) => {
    if (target.value !== order) {
      setOrder(target.value);
    }
  };

  if (!data) return null;
  const options = [
    { value: '', name: 'Mais recentes' },
    { value: 'ASC', name: 'Menor preço' },
    { value: 'DESC', name: 'Maior preço' },
  ];

  return (
    <section className={`${styles.productsBg} container`}>
      <div className={styles.filter}>
        <p>Ordenado por: </p>
        <Select options={options} value={order} handleClick={handleSelectFilt} />
      </div>
      <ul className={styles.products}>
        {data &&
          totalPages > 0 &&
          data.map(
            ({ id, slug, nome, preco, fotos, categoria, nome_usuario, usuario_id }) => {
              const portion = +preco.replace('.', '') / 12;
              const portionPrice = Number.isInteger(portion)
                ? portion
                : portion.toFixed(2).replace('.', ',');

              return (
                <li key={id}>
                  <picture>
                    <img src={fotos[0].src} alt={fotos[0].titulo} />
                  </picture>
                  <div className={styles.productInfos}>
                    <Link to={`/produto/${categoria}/${slug}`}>{nome}</Link>

                    <Link
                      className={styles.user}
                      to={`/usuario/${usuario_id}`}
                    >{`Vendido por ${nome_usuario}`}</Link>

                    <p className={styles.price}>R$ {preco}</p>
                    <span className={styles.portion}>{`12x de R$ ${portionPrice}`}</span>
                  </div>
                </li>
              );
            },
          )}
      </ul>
      <ul className={styles.paginationBtns}>
        {actualPage <= totalPages && actualPage > 1 && totalPages > 0 && (
          <li className={styles.btnAnt} onClick={handlePageAnt}>
            <IoIosArrowBack />
            <p>Anterior</p>
          </li>
        )}

        {totalPages > 0 && <li>{`${actualPage} de ${totalPages}`}</li>}

        {actualPage !== totalPages && totalPages > 0 && (
          <li className={styles.btnProx} onClick={handlePageProx}>
            <p>Próximo</p>
            <IoIosArrowForward />
          </li>
        )}
      </ul>
    </section>
  );
};

export default Products;
