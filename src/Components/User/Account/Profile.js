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

const Profile = ({ userData }) => {
  const [userInfos, setUserInfos] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [preview, setPreview] = React.useState({ url: false, open: false });
  const { request, loading } = useFetch();
  const { formatValue } = useFormatter();

  React.useEffect(() => {
    if (userData) {
      setUserInfos({
        name: userData.nome,
        email: userData.email,
        phone: userData.numero_celular,
      });
    }
  }, [userData]);

  const name = useValidate();
  const email = useValidate('email');
  const phone = useValidate('phone');
  phone.maxLength = '15';

  const { setValue: setNameValue } = name;
  const { setValue: setPhoneValue } = phone;
  const { setValue: setEmailValue } = email;

  React.useEffect(() => {
    if (userData) {
      setNameValue(userData.nome);
      setPhoneValue(formatValue({ format: 'phone', value: userData.numero_celular }));
      setEmailValue(userData.email);
    }
  }, [userData, setNameValue, setPhoneValue, setEmailValue, formatValue]);

  if (!userInfos) return null;

  const handleAttUser = async (event) => {
    event.preventDefault();
    if (name.validate() && email.validate() && phone.validate()) {
      const token = localStorage.getItem('token');
      const { url, options } = UPDATE_USER({ body: userInfos, token });
      const { response, json } = await request(url, options);
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

  return (
    <div className={`${styles.profile} container`}>
      {notification && (
        <RequestMessage notification={notification} setNotification={setNotification} />
      )}
      <div className={styles['profile-att-photo']}>
        <div className={styles['profile-photo']}>
          <ProfilePhoto img={preview.url ? preview.url : userData.foto_perfil} />
          <p>Carregue Uma Nova Foto</p>
        </div>
        {preview.open && <ProfileAttPhoto preview={preview} setPreview={setPreview} />}

        <label htmlFor="file" className="button">
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
          <button type="submit" className="button" disabled>
            Carregando...
          </button>
        ) : (
          <button type="submit" className="button">
            Atualizar Informações
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
