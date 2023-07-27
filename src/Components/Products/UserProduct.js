import React from 'react';
import styles from '../../Css/Products/UserProduct.module.css';
import useFetch from '../../Hooks/useFetch';
import { USER_OTHER_GET } from '../../Api/api';
import { Link } from 'react-router-dom';

const UserProduct = ({ keyUser }) => {
  const { request, data } = useFetch();

  React.useEffect(() => {
    const getUserInfos = async () => {
      const { url, options } = USER_OTHER_GET(keyUser.replace('@', ''));
      await request(url, options);
    };
    getUserInfos();
  }, [request, keyUser]);

  const months = {
    janeiro: 1,
    fevereiro: 2,
    março: 3,
    abril: 4,
    maio: 5,
    junho: 6,
    julho: 7,
    agosto: 8,
    setembro: 9,
    outubro: 10,
    novembro: 11,
    dezembro: 12,
  };

  const getMonthName = (monthNumber) => {
    for (const [key, value] of Object.entries(months)) {
      if (value === monthNumber) {
        return key;
      }
    }
  };

  if (!data) return null;
  const dateRegistered = data.data_registro.split(' ')[0].split('-');

  const month = getMonthName(+dateRegistered[1]).slice(0, 3);
  const year = dateRegistered[0];

  return (
    <>
      <ul className={styles['user-content']}>
        <span style={{ fontSize: '0.8rem' }}>Vendido por</span>
        <li>
          <div>
            <Link className={styles.username} to={`/usuario/${keyUser}`}>
              {data.nome}
            </Link>
            <p
              className={styles.address}
            >{`${data.endereco[0].cidade}, ${data.endereco[0].uf}`}</p>
          </div>
          <div>
            <Link className={styles['total-products']} to={`/usuario/${keyUser}`}>
              {data.total_postagens} postagens
            </Link>
            <div className={styles.data}>
              <span>{`No markfy desde: ${month}/${year}`}</span>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default UserProduct;
