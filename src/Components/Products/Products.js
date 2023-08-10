import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PRODUCTS_GET_BY_CATEGORY } from '../../Api/api';
import usePagination from '../../Hooks/usePagination';
import styles from '../../Css/Products/Products.module.css';
import Select from '../Form/Select';
import { allCategories } from '../User/PostProducts/CategoryPage/allCategories';
import Pagination from '../Reusable/Pagination';
import Image from '../Helper/Image';
import ProductsSkeleton from '../Skeletons/ProductsSkeleton';

const categories = allCategories();

const Products = () => {
  const { request, data } = useFetch();
  const { actualPage, setTotalItems, totalItems, maxPage, order, setOrder } =
    usePagination(9);

  const params = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const paramsURL = new URLSearchParams(search);
  const searchParam = paramsURL.get('q');

  const category = React.useMemo(
    () => categories.find(({ endpoint }) => endpoint === params.categoria) || null,
    [params.categoria],
  );

  const subcategory = React.useMemo(
    () =>
      category
        ? category.subcategories.find(({ endpoint }) => endpoint === params['*'])
        : null,
    [params, category],
  );

  React.useEffect(() => {
    const getProducts = async () => {
      const { url, options } = PRODUCTS_GET_BY_CATEGORY({
        category: category ? category.endpoint : null,
        subcategory: subcategory ? subcategory.endpoint : null,
        actualPage,
        order: order.order,
        search: searchParam,
      });
      const { response } = await request(url, options);
      const total = response.headers.get('x-total-count');
      setTotalItems(total);
    };
    getProducts();
  }, [
    actualPage,
    request,
    navigate,
    order,
    searchParam,
    setTotalItems,
    category,
    subcategory,
  ]);

  const handleSelectFilt = ({ target }) => {
    if (target.value !== order.order) {
      setOrder({ order: target.value, change: true });
    }
  };

  const options = [
    { value: 'DATE', name: 'Mais recentes' },
    { value: 'ASC', name: 'Menor preço' },
    { value: 'DESC', name: 'Maior preço' },
  ];

  if (!data && !maxPage > 0) return <ProductsSkeleton />;
  return (
    <section className={`${styles['products-bg']} container`}>
      <ul className={styles.filter}>
        <li className={styles.search}>
          <h1>
            {searchParam
              ? searchParam
              : (subcategory && subcategory.name) || category.name}
          </h1>
          <p>{`${totalItems || 'Carregando'} resultados`}</p>
        </li>

        <li className={styles.sort}>
          <p>Ordenado por: </p>
          <Select options={options} value={order.order} handleClick={handleSelectFilt} />
        </li>
      </ul>
      <ul className={styles.products}>
        {data.map(
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
                <div className={styles['product-infos']}>
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
      <Pagination maxPage={maxPage} actualPage={actualPage} />
    </section>
  );
};

export default Products;
