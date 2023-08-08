import React from 'react';
import styles from '../../Css/Products/Transaction.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import Skeleton from 'react-loading-skeleton';
import TransactionPaymentSkeleton from './TransactionPaymentSkeleton';

const TransactionSkeleton = () => {
  return (
    <section className={`container ${styles['transaction-container']}`}>
      <div className={styles['form-content']}>
        <div className={styles.payment}>
          <picture style={{ border: 'none' }}>
            <Skeleton className={skeletonCss['skeleton-text-gg ']} />
          </picture>
        </div>
        <form>
          <div>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
          <div>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
          <div>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
          <div>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
        </form>
      </div>
      <TransactionPaymentSkeleton />
    </section>
  );
};

export default TransactionSkeleton;
