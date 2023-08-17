import React from 'react';
import styles from '../../Css/User/Favorites.module.css';
import Skeleton from 'react-loading-skeleton';
import useMedia from '../../Hooks/useMedia';
import skeletonsCss from '../../Css/Skeletons/Skeletons.module.css';
import ProtectedRoute from '../Helper/ProtectedRoute';

const FavoritesSkeleton = () => {
  const mobileMatch = useMedia('(max-width: 600px)');

  return (
    <ProtectedRoute>
      <section className={`${styles['products-content']} container`}>
        <h1>
          <Skeleton />
        </h1>
        <div>
          <ul className={styles['product-section']}>
            <li>
              <Skeleton />
            </li>
            <li className={styles.price}>
              <Skeleton />
            </li>
            <li className={styles.remove}>
              <Skeleton />
            </li>
          </ul>
          <ul className={styles.product}>
            {Array(3)
              .fill()
              .map((e, i) => (
                <li key={i}>
                  <p className={skeletonsCss['skeleton-text-g']}>
                    <Skeleton className={styles.user} />
                  </p>

                  {!mobileMatch ? (
                    <div className={styles['product-items']}>
                      <div className={styles['product-infos']}>
                        <picture>
                          <Skeleton className={skeletonsCss['skeleton-image-p']} />
                        </picture>

                        <p>
                          <Skeleton className={skeletonsCss['skeleton-text-g']} />
                        </p>
                      </div>

                      <p className={styles.price}>
                        <Skeleton />
                      </p>
                      <p className={styles.remove}>
                        <Skeleton />
                      </p>
                    </div>
                  ) : (
                    <div className={styles['product-items']}>
                      <div className={styles['product-infos']}>
                        <picture>
                          <Skeleton />
                        </picture>

                        <div className={styles['product-infos-mobile']}>
                          <p>
                            <Skeleton />
                          </p>
                          <p className={styles.price}>
                            <Skeleton />
                          </p>
                        </div>

                        <p className={styles.remove}>
                          <Skeleton />
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default FavoritesSkeleton;
