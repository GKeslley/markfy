import React from 'react';
import styles from '../../Css/User/ProductsForSale.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import Skeleton from 'react-loading-skeleton';

const ProductsForSaleSkeleton = () => {
  return (
    <div className={styles.product}>
      <h1>
        <Skeleton className={skeletonCss['skeleton-text-g']} />
      </h1>
      <ul className={styles['products-content']}>
        {Array(5)
          .fill()
          .map((e, i) => (
            <li key={i}>
              <p>
                <picture>
                  <Skeleton style={{ height: '180px' }} />
                </picture>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductsForSaleSkeleton;
