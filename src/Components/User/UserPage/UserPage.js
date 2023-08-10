import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { USER_OTHER_GET } from '../../../Api/api';
import styles from '../../../Css/User/UserPage.module.css';
import ProductsForSale from '../Account/ProductsForSale';
import ProductsSold from '../Account/ProductsSold';
import ProfilePhoto from '../ProfilePhoto';
import UserPageSkeleton from '../../Skeletons/UserPageSkeleton';

const UserPage = () => {
  const [user, setUser] = React.useState(null);
  const username = useLocation().pathname.split('/')[2].trim();
  const { request, data } = useFetch();

  React.useEffect(() => {
    const getUser = async () => {
      const { url, options } = USER_OTHER_GET(username.replace('@', ''));
      const { response, json } = await request(url, options);
      if (response.ok) {
        setUser(json);
      }
    };
    getUser();
  }, [request, username]);

  if (!data) return <UserPageSkeleton />;
  return (
    <>
      {Object.values(user).length && (
        <section className={`${styles['user-container']} container`}>
          <div className={styles['user-content']}>
            <ul>
              <li>
                <ProfilePhoto img={user.foto_perfil} />
              </li>
              <li className={styles['user-infos']}>
                <p>{user.nome}</p>
                <div className={styles['user-data']}>
                  <address>
                    <p>{user.endereco[0].cidade},</p>
                    <p>{user.endereco[0].uf}</p>
                  </address>
                  <p className={styles.date}>
                    {`No markfy desde ${user.data_registro.split(' ')[0].split('-')[0]}`}
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
          </Routes>
        </section>
      )}
    </>
  );
};

export default UserPage;
