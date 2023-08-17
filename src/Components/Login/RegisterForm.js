import React from 'react';
import { POST_USER } from '../../Api/api';
import Input from '../Form/Input';
import Button from '../Reusable/Button';
import styles from '../../Css/Login/LoginForm.module.css';
import useValidate from '../../Hooks/useValidate';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import { GlobalContext } from '../../UserContext';

const Login = () => {
  const name = useValidate();
  const email = useValidate('email');
  const password = useValidate('password');
  const { userLogin } = React.useContext(GlobalContext);

  const { request, error, loading } = useFetch();

  const sendValuesLogin = async (event) => {
    event.preventDefault();
    if (name.validate() && email.validate() && password.validate()) {
      const { url, options } = POST_USER({
        nome: name.value,
        email: email.value,
        senha: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) {
        userLogin(email.value, password.value);
      }
    }
  };

  return (
    <div className="animeLeft">
      <h1>CADASTRE-SE</h1>
      <form className={styles.form} onSubmit={sendValuesLogin}>
        <Input label="Nome" type="text" name="nome" {...name} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="senha" {...password} />
        {loading ? (
          <Button disabled="disabled">Carregando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
      </form>
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default Login;
