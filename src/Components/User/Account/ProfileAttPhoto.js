import React from 'react';
import styles from '../../../Css/User/ProfileAttPhoto.module.css';
import Button from '../../Reusable/Button';
import { UPDATE_PROFILE_PHOTO } from '../../../Api/api';
import useFetch from '../../../Hooks/useFetch';
import Modal from '../../Reusable/Modal';

const ProfileAttPhoto = ({ preview, setPreview }) => {
  const { request, loading } = useFetch();

  const updateProfilePhoto = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append(preview.name, preview.file);
    const { url, options } = UPDATE_PROFILE_PHOTO(formData, token);
    const { response } = await request(url, options);
    if (response.ok) {
      setPreview({ ...preview, open: false });
    }
  };

  return (
    <Modal
      active={preview.open}
      setActive={() => setPreview({ url: false, open: false })}
      title="Editar mídia"
      className={styles['profile-dialog']}
    >
      <div className={styles['profile-dialog-text']}>
        {loading ? (
          <Button>Carregano</Button>
        ) : (
          <Button onClick={updateProfilePhoto}>Aplicar</Button>
        )}
      </div>
      <div className={styles['profile-dialog-photo']}>
        <picture className={styles['profile-dialog-att-photo']}>
          <img src={preview.url} alt={preview.name} />
        </picture>

        <img
          src={preview.url}
          alt={preview.name}
          className={styles['profile-dialog-full-photo']}
        />
      </div>
    </Modal>
  );
};

export default ProfileAttPhoto;
