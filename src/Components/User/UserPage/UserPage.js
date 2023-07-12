import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { USER_OTHER_GET } from '../../../Api/api';
import { ReactComponent as UserImg } from '../../../Assets/user-svgrepo-com.svg';
import styles from '../../../Css/User/UserPage.module.css';
import ProductsForSale from '../Account/ProductsForSale';
import ProductsSold from '../Account/ProductsSold';

const UserPage = () => {
  const [user, setUser] = React.useState(null);

  const username = useLocation().pathname.split('/')[2].trim();
  const { request } = useFetch();

  React.useEffect(() => {
    const getUser = async () => {
      const { url, options } = USER_OTHER_GET(username.replace('@', ''));
      const dataUser = await request(url, options);
      setUser(dataUser.json);
    };
    getUser();
  }, [request, username]);

  console.log(user);
  if (!user) return null;
  return (
    <>
      {Object.values(user).length && (
        <section className="container">
          <div className={styles.userContent}>
            <ul>
              <li>
                <picture>
                  <UserImg />
                </picture>
              </li>
              <li className={styles.userInfos}>
                <p>{user.nome}</p>
                <div className={styles.userData}>
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
            <Route path="vendidos" element={<ProductsSold />}></Route>
          </Routes>
        </section>
      )}
    </>
  );
};

export default UserPage;
