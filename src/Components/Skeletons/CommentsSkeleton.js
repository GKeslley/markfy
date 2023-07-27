import React from 'react';
import styles from '../../Css/Products/Comments.module.css';
import Skeleton from 'react-loading-skeleton';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';

const CommentsSkeleton = () => {
  return (
    <article className={styles['product-asks']}>
      <h2>
        <Skeleton className={skeletonCss['skeleton-text-gg']} />
      </h2>
      <form className={styles['ask-section']}>
        <Skeleton className={skeletonCss['skeleton-input']} />
        <Skeleton className={skeletonCss['skeleton-btn']} />

        <p>
          <Skeleton className={skeletonCss['skeleton-text-m']} />
        </p>
      </form>
    </article>
  );
};

export default CommentsSkeleton;
