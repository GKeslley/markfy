import React from 'react';
import styles from '../../Css/User/UserPage.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import Skeleton from 'react-loading-skeleton';

const UserProductsSkeleton = () => {
  return (
    <section className={`${styles['user-container']} container`}>
      <div className={styles['user-content']}>
        <ul>
          <li>
            <Skeleton className={skeletonCss['skeleton-img-round']} />
          </li>
          <li className={styles['user-infos']}>
            <p>
              <Skeleton className={skeletonCss['skeleton-text-m']} />
            </p>
            <div className={styles['user-data']}>
              <address>
                <p>
                  <Skeleton className={skeletonCss['skeleton-text-m']} />
                </p>
                <p>
                  <Skeleton className={skeletonCss['skeleton-text-m']} />
                </p>
              </address>
              <p className={styles.date}>
                <Skeleton className={skeletonCss['skeleton-text-m']} />
              </p>
            </div>
          </li>
        </ul>
      </div>

      <ul className={styles.links}>
        <li>
          <Skeleton className={skeletonCss['skeleton-text-m']} />
        </li>
        <li>
          <Skeleton className={skeletonCss['skeleton-text-m']} />
        </li>
      </ul>
    </section>
  );
};

export default UserProductsSkeleton;
