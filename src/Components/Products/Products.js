import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PRODUCTS_GET_BY_CATEGORY } from '../../Api/api';
import usePagination from '../../Hooks/usePagination';
import styles from '../../Css/Products/Products.module.css';
import Select from '../Form/Select';
import { allCategories } from '../User/PostProducts/CategoryPage/allCategories';
import Pagination from '../Reusable/Pagination';
import Skeleton from 'react-loading-skeleton';
import Image from '../Helper/Image';

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

  let category = params.categoria;
  let subcategory = params['*'] ? params['*'] : null;
  let subcategoryName = '';

  for (let catValue of categories) {
    for (let subValue of catValue.subcategories) {
      if (subValue.endpoint === subcategory) {
        subcategoryName = subValue.name;
      }
      if (
        searchParam &&
        subValue.name.toLowerCase().includes(searchParam.toLowerCase())
      ) {
        category = catValue.endpoint;
        subcategory = subValue.endpoint;
        break;
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
      const { response } = await request(url, options);
      const total = response.headers.get('x-total-count');
      const totalItensPerPage = 9;
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

  const options = [
    { value: '', name: 'Mais recentes' },
    { value: 'ASC', name: 'Menor preço' },
    { value: 'DESC', name: 'Maior preço' },
  ];

  return (
    <section className={`${styles.productsBg} container`}>
      <ul className={styles.filter}>
        <li className={styles.search}>
          <h1>{searchParam ? searchParam : subcategoryName || category}</h1>
          <p>{`${totalPages.totalItens || 'Carregando'} resultados`}</p>
        </li>

        <li className={styles.sort}>
          <p>Ordenado por: </p>
          <Select options={options} value={order} handleClick={handleSelectFilt} />
        </li>
      </ul>
      <ul className={styles.products}>
        {data && totalPages.pages > 0 ? (
          data.map(
            ({ id, slug, nome, preco, fotos, categoria, nome_usuario, usuario_id }) => {
              const portion = +preco.replace('.', '') / 12;
              const portionPrice = Number.isInteger(portion)
                ? portion
                : portion.toFixed(2).replace('.', ',');

              return (
                <li key={id}>
                  <picture>
                    <Image alt={fotos[0].titulo} src={fotos[0].src} />
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
          )
        ) : (
          <div>
            {Array(3)
              .fill()
              .map(() => (
                <li className={styles.skeleton}>
                  <picture>
                    <Skeleton className={styles['skeleton-img']} />
                  </picture>

                  <div className={styles.productInfos}>
                    <Skeleton containerClassName={styles['skeleton-link']} />
                    <Skeleton containerClassName={styles['user']} />

                    <p className={styles.price}>
                      <Skeleton />
                    </p>
                    <span className={styles.portion}>
                      <Skeleton />
                    </span>
                  </div>
                </li>
              ))}
          </div>
        )}
      </ul>
      <Pagination
        handlePageAnt={handlePageAnt}
        handlePageProx={handlePageProx}
        totalPages={totalPages}
        actualPage={actualPage}
      />
    </section>
  );
};

export default Products;
