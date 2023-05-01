import React from 'react';
import { POST_USER } from '../../Api/api';
import Input from '../Form/Input';
import Button from '../Reusable/Button';
import styles from '../../Css/Login/LoginForm.module.css';
import { ReactComponent as Wave } from '../../Assets/waves.svg';
import useValidate from '../Hooks/Validate';

const Login = () => {
  const nome = useValidate();
  const email = useValidate('email');
  const password = useValidate('password');

  const sendValuesLogin = async (event) => {
    event.preventDefault();
    if (nome.validate() && email.validate() && password.validate()) {
      const { url, options } = POST_USER({
        nome: nome.value,
        email: email.value,
        senha: password.value,
      });
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
      } catch (Error) {
        console.log(Error);
      }
    }
  };

  return (
    <section className={`${styles.registerBg}`}>
      <Wave />
      <div className={`${styles.formContent} container`}>
        <h1 className="title">BEM VINDO</h1>
        <form className={styles.form} onSubmit={sendValuesLogin}>
          <Input label="Nome" type="text" name="nome" {...nome} />
          <Input label="Email" type="email" name="email" {...email} />
          <Input label="Senha" type="password" name="senha" {...password} />
          <Button>Confirmar</Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
