import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PRODUCTS_GET_BY_CATEGORY } from '../../Api/api';
import usePagination from '../../Hooks/usePagination';
import styles from '../../Css/Products/Products.module.css';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Select from '../Form/Select';
import {
  allCategories,
  toEndpoint,
} from '../User/PostProducts/CategoryPage/allCategories';

const Products = ({ searchProduct }) => {
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
  const { search } = useLocation();

  const paramsURL = new URLSearchParams(search);
  const searchParam = paramsURL.get('q');
  const categories = allCategories();

  console.log(categories);

  let category = params.categoria;
  let subcategory = params['*'] ? params['*'] : null;

  if (searchParam) {
    for (let catValue of categories) {
      for (let subValue of catValue.subcategories) {
        if (subValue.toLowerCase().includes(searchParam.toLowerCase())) {
          category = catValue.endpoint;
          subcategory = toEndpoint(subValue);
          break;
        }
      }
    }
  }

  React.useEffect(() => {
    const getProducts = async () => {
      console.log(category, subcategory);
      const { url, options } = PRODUCTS_GET_BY_CATEGORY({
        category,
        subcategory,
        actualPage,
        order,
        search: searchParam,
      });
      const { response, json } = await request(url, options);
      console.log(json);
      const total = response.headers.get('x-total-count');
      const totalItensPerPage = 9;
      const isInt = Number.isInteger(+total / 9);
      setTotalPages({
        pages: isInt
          ? +total / totalItensPerPage
          : Math.floor(+total / totalItensPerPage) + 1,
        totalItens: total,
      });
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
    searchParam,
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
      <ul className={styles.filter}>
        <li className={styles.search}>
          <h1>{searchParam ? searchParam : subcategory || category}</h1>
          <p>{`${totalPages.totalItens} resultados`}</p>
        </li>

        <li className={styles.sort}>
          <p>Ordenado por: </p>
          <Select options={options} value={order} handleClick={handleSelectFilt} />
        </li>
      </ul>
      <ul className={styles.products}>
        {data &&
          totalPages.pages > 0 &&
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
        {actualPage <= totalPages.pages && actualPage > 1 && totalPages.pages > 0 && (
          <li className={styles.btnAnt} onClick={handlePageAnt}>
            <IoIosArrowBack />
            <p>Anterior</p>
          </li>
        )}

        {totalPages.pages > 0 && <li>{`${actualPage} de ${totalPages.pages}`}</li>}

        {actualPage !== totalPages.pages && totalPages.pages > 0 && (
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
