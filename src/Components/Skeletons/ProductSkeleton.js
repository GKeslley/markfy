import React from 'react';
import styles from '../../Css/Products/Product.module.css';
import Skeleton from 'react-loading-skeleton';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import CommentsSkeleton from './CommentsSkeleton';

const ProductSkeleton = () => {
  return (
    <section className="container">
      <div className={styles['product-content']}>
        <article className={styles['product-infos']}>
          <Skeleton />

          <Skeleton className={skeletonCss['skeleton-image-g']} />

          <ul className={styles['product-infos-fields']}>
            <li className={styles['product-name']}>
              <Skeleton className={skeletonCss['skeleton-text-gg']} />
            </li>
            <li>
              <Skeleton className={skeletonCss['skeleton-text-m']} />
            </li>
            <li className={styles['product-price']}>
              <p>
                <Skeleton className={skeletonCss['skeleton-text-g']} />
              </p>
              <span>
                <Skeleton className={skeletonCss['skeleton-text-g']} />
              </span>
            </li>
            <li className={styles['product-btns']}>
              <Skeleton className={skeletonCss['skeleton-btn']} />
              <Skeleton className={skeletonCss['skeleton-btn']} />
            </li>
          </ul>
        </article>

        <article className={styles['product-description']}>
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
