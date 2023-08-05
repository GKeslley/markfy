import React from 'react';
import styles from '../../../Css/User/ProfileAttPhoto.module.css';
import Button from '../../Reusable/Button';
import { BsArrowLeft } from 'react-icons/bs';
import useOutsideClick from '../../../Hooks/useOutsideClick';
import { UPDATE_PROFILE_PHOTO } from '../../../Api/api';
import useFetch from '../../../Hooks/useFetch';

const ProfileAttPhoto = ({ preview, setPreview }) => {
  const { request, loading } = useFetch();
  const refDialog = React.useRef();

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

  useOutsideClick(refDialog, () => setPreview({ url: false, open: false }));

  return (
    <dialog className={styles['profile-dialog-bg']}>
      <div className={styles['profile-dialog']} ref={refDialog}>
        <div className={styles['profile-dialog-text']}>
          <div>
            <span onClick={() => setPreview({ url: false, open: false })}>
              <BsArrowLeft strokeWidth={0.8} />
            </span>
            <p>Editar mídia</p>
          </div>
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
      </div>
    </dialog>
  );
};

export default ProfileAttPhoto;
