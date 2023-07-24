import React from 'react';
import styles from '../../Css/Products/Product.module.css';
import Skeleton from 'react-loading-skeleton';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import CommentsSkeleton from './CommentsSkeleton';

const ProductSkeleton = () => {
  return (
    <section className="container">
      <div className={styles.productContent}>
        <article className={styles.productAndInfos}>
          <Skeleton />

          <Skeleton className={skeletonCss['skeleton-image-g']} />

          <ul className={styles.productInfos}>
            <li className={styles.productName}>
              <Skeleton className={skeletonCss['skeleton-text-gg']} />
            </li>
            <li>
              <Skeleton className={skeletonCss['skeleton-text-m']} />
            </li>
            <li className={styles.productPrice}>
              <p>
                <Skeleton className={skeletonCss['skeleton-text-g']} />
              </p>
              <span>
                <Skeleton className={skeletonCss['skeleton-text-g']} />
              </span>
            </li>
            <li className={styles.productBtns}>
              <Skeleton className={skeletonCss['skeleton-btn']} />
              <Skeleton className={skeletonCss['skeleton-btn']} />
            </li>
          </ul>
        </article>

        <article className={styles.productDescription}>
          <h2>
            <Skeleton />
          </h2>
          <p>
            <Skeleton />
          </p>
        </article>

        <CommentsSkeleton />
      </div>
    </section>
  );
};

export default ProductSkeleton;
