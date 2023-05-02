import React from 'react';
import { POST_USER } from '../../Api/api';
import Input from '../Form/Input';
import Button from '../Reusable/Button';
import styles from '../../Css/Login/LoginForm.module.css';
import useValidate from '../../Hooks/useValidate';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const nome = useValidate();
  const email = useValidate('email');
  const password = useValidate('password');
  const { request, error, loading } = useFetch();
  const navigate = useNavigate();

  const sendValuesLogin = async (event) => {
    event.preventDefault();
    if (nome.validate() && email.validate() && password.validate()) {
      const { url, options } = POST_USER({
        nome: nome.value,
        email: email.value,
        senha: password.value,
      });
      const register = await request(url, options);
      if (register.response.ok) {
        navigate('/');
      }
    }
  };

  return (
    <div className="animeLeft">
      <h1 className="title">BEM VINDO</h1>
      <form className={styles.form} onSubmit={sendValuesLogin}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="senha" {...password} />
        {loading ? (
          <Button disabled="disabled">Carregando...</Button>
        ) : (
          <Button>Confirmar</Button>
        )}
      </form>
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Login;
