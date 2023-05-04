import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Aside from '../Aside';
import ProductForm from './ProductForm';
import Settings from './Settings';
import styles from '../../Css/User/Conta.module.css';

const Conta = () => {
  return (
    <section className={styles.contaContent}>
      <Aside>
        <ul className="container">
          <li>
            <NavLink to="produto">Adicionar produto</NavLink>
          </li>
          <li>
            <NavLink to="configuracoes">Configurações</NavLink>
          </li>
        </ul>
      </Aside>

      <Routes>
        <Route path="produto" element={<ProductForm />}></Route>
        <Route path="configuracoes" element={<Settings />}></Route>
      </Routes>
    </section>
  );
};

export default Conta;
