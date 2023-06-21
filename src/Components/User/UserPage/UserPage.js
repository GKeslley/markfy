import React from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { PRODUCTS_GET, USER_OTHER_GET } from '../../../Api/api';
import { ReactComponent as UserImg } from '../../../Assets/user-svgrepo-com.svg';
import styles from '../../../Css/User/UserPage.module.css';

const UserPage = () => {
  const [user, setUser] = React.useState(null);
  const [products, setProducts] = React.useState(null);

  const userName = useLocation().pathname.split('/')[2].trim();
  const { request } = useFetch();

  React.useEffect(() => {
    const getUser = async () => {
      const endpointUser = USER_OTHER_GET(userName.replace('@', ''));
      const endpointProducts = PRODUCTS_GET({ page: '1', total: '9', user: userName });

      const dataUser = await request(endpointUser.url, endpointUser.options);

      const dataProducts = await request(endpointProducts.url, endpointProducts.options);

      setUser(dataUser.json);
      setProducts(dataProducts.json);
    };
    getUser();
  }, [request, userName]);

  console.log(user);
  console.log(products);
  if (!user) return null;
  return (
    <>
      {Object.values(user).length && products.length && (
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

          <div>
            <ul>
              <li></li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default UserPage;
