import React from 'react';
import { ReactComponent as UserImg } from '../../Assets/user-svgrepo-com.svg';
import styles from '../../Css/User/ProfilePhoto.module.css';
import Image from '../Helper/Image';

const ProfilePhoto = ({ img }) => {
  return (
    <>
      {!img ? (
        <picture className={styles['profile-photo']}>{<UserImg />}</picture>
      ) : (
        <Image alt="perfil" src={img} className={styles['profile-photo-img']} />
      )}
    </>
  );
};

export default ProfilePhoto;
