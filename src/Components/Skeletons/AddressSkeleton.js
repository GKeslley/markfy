import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from '../../Css/User/Address.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';

const AddressSkeleton = () => {
  return (
    <div className={`${styles.address} container`}>
      <form>
        <div>
          <Skeleton className={skeletonCss['skeleton-label']} />
          <Skeleton className={skeletonCss['skeleton-input']} />
        </div>
        <div className={styles['address-element']}>
          <div className={styles['address-element-input']}>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
          <div className={styles['address-element-input']}>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
          <div className={styles['address-element-input']}>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
        </div>
        <div className={styles['address-element']}>
          <div className={styles['address-element-input']}>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
          <div className={styles['address-element-input']}>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
          <div className={styles['address-element-input']}>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
        </div>
        <div>
          <Skeleton className={skeletonCss['skeleton-label']} />
          <Skeleton className={skeletonCss['skeleton-input']} />
        </div>

        <Skeleton className={skeletonCss['skeleton-btn']} />
      </form>
    </div>
  );
};

export default AddressSkeleton;
