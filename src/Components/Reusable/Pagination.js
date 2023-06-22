import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from '../../Css/ReusablesCss/Pagination.module.css';

const Pagination = ({ totalPages, actualPage, handlePageAnt, handlePageProx }) => {
  return (
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
  );
};

export default Pagination;
