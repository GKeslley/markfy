import React from 'react';
import styles from '../../Css/User/Profile.module.css';
import Skeleton from 'react-loading-skeleton';
import skeletonCss from '../../Css/Skeletons/Skeletons.module.css';

const ProfileSkeleton = () => {
  return (
    <div className={`${styles.profile} container`}>
      <div className={styles['profile-att-photo']}>
        <div className={styles['profile-photo']}>
          <Skeleton className={skeletonCss['skeleton-img-round']} />
          <p>
            <Skeleton className={skeletonCss['skeleton-text-g']} />
          </p>
        </div>
        <label>
          <Skeleton className={skeletonCss['skeleton-btn']} />
        </label>
      </div>
      <form className={styles['profile-form']}>
        <div className={styles['profile-form-name-phone']}>
          <div className={styles['profile-form-element']}>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
          <div className={styles['profile-form-element']}>
            <Skeleton className={skeletonCss['skeleton-label']} />
            <Skeleton className={skeletonCss['skeleton-input']} />
          </div>
        </div>
        <div className={styles['profile-form-element']}>
          <Skeleton className={skeletonCss['skeleton-label']} />
          <Skeleton className={skeletonCss['skeleton-input']} />
        </div>
        <Skeleton className={skeletonCss['skeleton-btn']} />
      </form>
    </div>
  );
};

export default ProfileSkeleton;
