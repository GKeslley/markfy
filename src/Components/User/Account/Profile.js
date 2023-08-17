import React from 'react';
import Input from '../../Form/Input';
import useFetch from '../../../Hooks/useFetch';
import { UPDATE_USER } from '../../../Api/api';
import useValidate from '../../../Hooks/useValidate';
import styles from '../../../Css/User/Profile.module.css';
import RequestMessage from '../../Reusable/RequestMessage';
import useFormatter from '../../../Hooks/useFormatter';
import ProfilePhoto from '../ProfilePhoto';
import ProfileAttPhoto from './ProfileAttPhoto';
import ProfileSkeleton from '../../Skeletons/ProfileSkeleton';
import Button from '../../Reusable/Button';

const Profile = ({ userData }) => {
  const [userInfos, setUserInfos] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [preview, setPreview] = React.useState({ url: false, open: false });
  const { request, loading } = useFetch();
  const { formatValue } = useFormatter();

  const name = useValidate();
  const email = useValidate('email');
  const phone = useValidate('phone');
  phone.maxLength = '15';

  const { setValue: setNameValue } = name;
  const { setValue: setPhoneValue } = phone;
  const { setValue: setEmailValue } = email;

  const setDefaultValues = React.useCallback(
    (user) => {
      const { nome, email, numero_celular } = user;
      setNameValue(nome);
      setPhoneValue(formatValue({ format: 'phone', value: numero_celular }));
      setEmailValue(email);
    },
    [setNameValue, setPhoneValue, setEmailValue, formatValue],
  );

  React.useEffect(() => {
    if (userData) {
      const { nome, email, numero_celular } = userData;
      setDefaultValues(userData);
      setUserInfos({
        name: nome,
        email: email,
        phone: numero_celular,
      });
    }
  }, [userData, setDefaultValues]);

  const handleAttUser = async (event) => {
    event.preventDefault();
    if (name.validate() && email.validate() && phone.validate()) {
      const token = localStorage.getItem('token');
      const { url, options } = UPDATE_USER({ body: userInfos, token });
      const { response } = await request(url, options);
      if (response.ok) {
        setNotification('Usuário atualizado com sucesso!');
      }
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const replaceValue = value.replace(/\D/g, '');
    setUserInfos({ ...userInfos, [name]: name === 'phone' ? replaceValue : value });
  };

  const imagesPreview = ({ target }) => {
    const files = target.files;
    const url = URL.createObjectURL(files[0]);
    const name = files[0].name;
    setPreview({ url, open: true, name, file: files[0] });
  };

  if (!userInfos) return <ProfileSkeleton />;
  return (
    <div className={`${styles.profile} container`}>
      {notification && (
        <RequestMessage notification={notification} setNotification={setNotification} />
      )}
      <div className={styles['profile-att-photo']}>
        <div className={styles['profile-photo']}>
          <ProfilePhoto img={preview.url ? preview.url : userData.foto_perfil} />
          <div className={styles['profile-photo-content']}>
            <div>
              <p>Carregue uma nova foto</p>
            </div>
            <label htmlFor="file" className="button-outline">
              Selecionar
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={imagesPreview}
            />
          </div>
        </div>
        {preview.open && <ProfileAttPhoto preview={preview} setPreview={setPreview} />}
      </div>
      <form
        className={styles['profile-form']}
        onSubmit={handleAttUser}
        onChange={handleChange}
      >
        <div className={styles['profile-form-name-phone']}>
          <div className={styles['profile-form-element']}>
            <Input type="text" name="name" label="Nome" required={true} {...name} />
          </div>
          <div className={styles['profile-form-element']}>
            <Input type="tel" name="phone" label="Telefone celular" {...phone} />
          </div>
        </div>
        <div className={styles['profile-form-element']}>
          <Input type="email" name="email" label="Email" {...email} required={true} />
        </div>
        {loading ? (
          <Button type="submit" disabled>
            Carregando...
          </Button>
        ) : (
          <Button type="submit">Atualizar Informações</Button>
        )}
      </form>
    </div>
  );
};

export default Profile;
