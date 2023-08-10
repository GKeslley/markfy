import React from 'react';
import styles from '../../Css/User/Adverts.module.css';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';
import Skeleton from 'react-loading-skeleton';

const AdvertsSkeleton = () => {
  return (
    <article className={`${styles['adverts-container']} container`}>
      <Skeleton
        className={skeletonCss['skeleton-text-g']}
        containerClassName={skeletonCss['skeleton-right']}
      />
      <ul className={styles['adverts-content']}>
        <div className={styles['advert-row']}>
          <Skeleton className={skeletonCss['skeleton-text-l']} />
          <Skeleton className={skeletonCss['skeleton-text-l']} />
        </div>
        <Skeleton className={skeletonCss['skeleton-text-l']} />

        {Array(2)
          .fill()
          .map((e, i) => (
            <li key={i} className={styles.adverts}>
              <Skeleton className={skeletonCss['skeleton-image-m']} />
            </li>
          ))}
      </ul>
    </article>
  );
};

export default AdvertsSkeleton;
