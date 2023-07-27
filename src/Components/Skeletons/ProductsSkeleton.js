import React from 'react';
import styles from '../../Css/Products/Products.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import Skeleton from 'react-loading-skeleton';

const ProductsSkeleton = () => {
  return (
    <section className={`${styles['products-bg']} container`}>
      <ul className={styles.filter}>
        <li className={styles.search}>
          <h1>
            <Skeleton className={skeletonCss['skeleton-text-gg']} />
          </h1>
          <p>
            <Skeleton className={skeletonCss['skeleton-text-m']} />
          </p>
        </li>

        <li className={styles.sort}>
          <p>
            <Skeleton className={skeletonCss['skeleton-text-m']} />
          </p>
        </li>
      </ul>
      <ul className={styles.products}>
        {Array(3)
          .fill()
          .map((e, i) => (
            <li className={skeletonCss['skeleton-flex-row']} key={i}>
              <picture>
                <Skeleton className={skeletonCss['skeleton-image-static']} />
              </picture>

              <div className={styles.productInfos}>
                <Skeleton className={skeletonCss['skeleton-text-gg']} />

                <p className={styles.user}>
                  <Skeleton className={skeletonCss['skeleton-text-m']} />
                </p>

                <p>
                  <Skeleton className={skeletonCss['skeleton-text-m']} />
                </p>
                <span className={skeletonCss['skeleton-text-m']}>
                  <Skeleton />
                </span>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ProductsSkeleton;
