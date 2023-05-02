import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ReactComponent as Wave } from '../../Assets/waves.svg';
import styles from '../../Css/Login/Login.module.css';
import ProtectedRoute from '../Helper/ProtectedRoute';

const Login = () => {
  return (
    <section className={styles.registerBg}>
      <Wave />
      <div className={`${styles.formContent} container`}>
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/criar" element={<RegisterForm />}></Route>
          </Routes>
        </ProtectedRoute>
      </div>
    </section>
  );
};

export default Login;
