import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Aside from '../Aside';
import ProductForm from './PostProducts/ProductForm';
import Settings from './Settings';
import styles from '../../Css/User/Conta.module.css';
import ProductCategory from './PostProducts/CategoryPage/ProductCategory';

const Conta = () => {
  const [category, setCategory] = React.useState(null);
  const [getSubcategory, setGetSubcategory] = React.useState(null);

  return (
    <section className={styles.contaContent}>
      <Aside>
        <ul className="container">
          <li>
            <NavLink to="produto/categoria">Adicionar produto</NavLink>
          </li>
          <li>
            <NavLink to="configuracoes">Configurações</NavLink>
          </li>
        </ul>
      </Aside>

      <Routes>
        <Route
          path="produto/categoria"
          element={
            <ProductCategory
              setCategory={setCategory}
              category={category}
              setGetSubcategory={setGetSubcategory}
            />
          }
        ></Route>
        <Route
          path="produto/form"
          element={<ProductForm category={category} getSubcategory={getSubcategory} />}
        ></Route>
        <Route path="configuracoes" element={<Settings />}></Route>
      </Routes>
    </section>
  );
};

export default Conta;
