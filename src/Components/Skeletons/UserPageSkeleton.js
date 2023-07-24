import React from 'react';
import styles from '../../Css/User/UserPage.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import Skeleton from 'react-loading-skeleton';

const UserProductsSkeleton = () => {
  return (
    <section className="container">
      <div className={styles.userContent}>
        <ul>
          <li>
            <Skeleton className={skeletonCss['skeleton-img-round']} />
          </li>
          <li className={styles.userInfos}>
            <p>
              <Skeleton className={skeletonCss['skeleton-text-m']} />
            </p>
            <div className={styles.userData}>
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
