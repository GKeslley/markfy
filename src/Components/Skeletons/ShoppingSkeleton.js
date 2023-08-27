import React from 'react';
import styles from '../../Css/User/Shopping.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import Skeleton from 'react-loading-skeleton';

const ShoppingSkeleton = () => {
  return (
    <>
      <ul className={`${styles['shopping-container']} container`}>
        {Array(3)
          .fill()
          .map((e, i) => (
            <li key={i}>
              <picture style={{ maxWidth: 'none', minWidth: 'none' }}>
                <Skeleton className={skeletonCss['skeleton-image-m']} />
              </picture>
              <div className={styles['product-infos']}>
                <Skeleton className={skeletonCss['skeleton-text-g']} />

                <Skeleton className={skeletonCss['skeleton-text-m']} />

                <Skeleton className={skeletonCss['skeleton-text-m']} />
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default ShoppingSkeleton;
