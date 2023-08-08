import React from 'react';
import styles from '../../Css/Products/Transaction.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import Skeleton from 'react-loading-skeleton';

const TransactionPaymentSkeleton = () => {
  return (
    <ul className={styles.infos}>
      <li>
        <Skeleton className={skeletonCss['skeleton-text-g']} />
      </li>
      <li>
        <Skeleton className={skeletonCss['skeleton-text-m']} />
      </li>
      <li>
        <Skeleton className={skeletonCss['skeleton-text-m']} />
        <Skeleton className={skeletonCss['skeleton-text-m']} />
      </li>
      <li>
        <Skeleton className={skeletonCss['skeleton-text-m']} />
      </li>
      <li>
        <Skeleton className={skeletonCss['skeleton-text-m']} />
      </li>
      <Skeleton className={skeletonCss['skeleton-btn']} />
    </ul>
  );
};

export default TransactionPaymentSkeleton;
