import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from '../../Css/ReusablesCss/Pagination.module.css';
import usePagination from '../../Hooks/usePagination';

const Pagination = ({ maxPage, actualPage }) => {
  const { handlePageAnt, handlePageProx } = usePagination();

  return (
    <>
      {maxPage > 1 && (
        <ul className={styles['pagination-btns']}>
          {actualPage <= maxPage && actualPage > 1 && maxPage > 0 && (
            <li className={styles.btnAnt} onClick={handlePageAnt}>
              <IoIosArrowBack />
              <p>Anterior</p>
            </li>
          )}

          {maxPage > 0 && <li>{`${actualPage} de ${maxPage}`}</li>}

          {actualPage !== maxPage && maxPage > 0 && (
            <li className={styles['btn-prox']} onClick={handlePageProx}>
              <p>Próximo</p>
              <IoIosArrowForward />
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Pagination;
