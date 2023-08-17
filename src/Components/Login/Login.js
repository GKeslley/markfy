import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from '../../Css/Login/Login.module.css';
import Error404 from '../Helper/Error404';
import { GlobalContext } from '../../UserContext';

const Login = () => {
  const { userData } = React.useContext(GlobalContext);

  if (userData) return <Navigate to="/" />;
  return (
    <section className={styles['register-bg']}>
      <div className={`${styles['form-content']} container`}>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/criar" element={<RegisterForm />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </div>
    </section>
  );
};

export default Login;
