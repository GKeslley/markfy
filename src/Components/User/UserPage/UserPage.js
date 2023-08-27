import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { USER_OTHER_GET } from '../../../Api/api';
import styles from '../../../Css/User/UserPage.module.css';
import ProductsForSale from '../Account/ProductsForSale';
import ProductsSold from '../Account/ProductsSold';
import ProfilePhoto from '../ProfilePhoto';
import UserPageSkeleton from '../../Skeletons/UserPageSkeleton';
import Error404 from '../../Helper/Error404';
import ErrorRequest from '../../Helper/ErrorRequest';

const UserPage = () => {
  const { request, data, loading, error } = useFetch();
  const username = useLocation().pathname.split('/')[2].trim();

  React.useEffect(() => {
    const getUser = async () => {
      const { url, options } = USER_OTHER_GET(username.replace('@', ''));
      await request(url, options);
    };
    getUser();
  }, [request, username]);

  if (loading) return <UserPageSkeleton />;
  if (error) return <ErrorRequest>USUÁRIO NÃO ENCONTRADO</ErrorRequest>;
  if (!data) return null;
  return (
    <>
      {Object.values(data).length && (
        <section className={`${styles['user-container']} container`}>
          <div className={styles['user-content']}>
            <ul>
              <li>
                <ProfilePhoto img={data.foto_perfil} />
              </li>
              <li className={styles['user-infos']}>
                <p>{data.nome}</p>
                <div className={styles['user-data']}>
                  <address>
                    <p>{data.endereco[0].cidade},</p>
                    <p>{data.endereco[0].uf}</p>
                  </address>
                  <p className={styles.date}>
                    {`No markfy desde ${data.data_registro.split(' ')[0].split('-')[0]}`}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <ul className={styles.links}>
            <li>
              <NavLink to="" end>
                À venda
              </NavLink>
            </li>
            <li>
              <NavLink to="vendidos">Vendidos</NavLink>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<ProductsForSale username={username} />}></Route>
            <Route path="vendidos" element={<ProductsSold username={username} />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </section>
      )}
    </>
  );
};

export default UserPage;
