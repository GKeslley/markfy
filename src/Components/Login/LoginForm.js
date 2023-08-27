import React from 'react';
import { Link } from 'react-router-dom';
import useValidate from '../../Hooks/useValidate';
import Input from '../Form/Input';
import Error from '../Helper/Error';
import Button from '../Reusable/Button';
import styles from '../../Css/Login/LoginForm.module.css';
import { GlobalContext } from '../../UserContext';

const LoginForm = () => {
  const email = useValidate('email');
  const password = useValidate('password');
  const { userLogin, loading, error } = React.useContext(GlobalContext);
  let modifyError = null;

  const sendValuesLogin = async (event) => {
    event.preventDefault();
    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  };

  if (error && error.includes('Perdeu a senha?')) {
    modifyError = 'A senha fornecida para o email está incorreta.';
  }

  return (
    <div className="animeLeft">
      <h1>OLÁ NOVAMENTE</h1>
      <form className={styles.form} onSubmit={sendValuesLogin}>
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="senha" {...password} />
        {loading ? (
          <Button disabled="disabled">Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
      </form>
      {error && <Error>{!modifyError ? error : modifyError}</Error>}
      <Link className={styles['lost-password']} to="/esqueceu">
        Perdeu a Senha?
      </Link>
      <div className={styles['content-register']}>
        <p>Cadastre-se</p>
        <Link to="criar">Cadastro</Link>
      </div>
    </div>
  );
};

export default LoginForm;
