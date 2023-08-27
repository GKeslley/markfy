import React from 'react';
import { Routes, Route, NavLink, useParams } from 'react-router-dom';
import Aside from '../Aside';
import ProductForm from './PostProducts/ProductForm';
import styles from '../../Css/User/Conta.module.css';
import ProductCategory from './PostProducts/CategoryPage/ProductCategory';
import Profile from './Account/Profile';
import Address from './Account/Address';
import { GlobalContext } from '../../UserContext';
import { AiFillHome, AiFillProfile } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { IoLogOutSharp } from 'react-icons/io5';
import { FaClipboardList, FaShoppingCart } from 'react-icons/fa';
import Adverts from './Account/Adverts';
import Error404 from '../Helper/Error404';
import Shopping from './Account/Shopping';

const User = () => {
  const { userData, userLogout } = React.useContext(GlobalContext);
  const [category, setCategory] = React.useState(null);
  const [subcategory, setSubcategory] = React.useState(null);
  const params = useParams();

  const logout = () => {
    if (window.confirm('Você realmente deseja se desconectar?')) {
      userLogout();
    }
  };

  return (
    <section className={styles.user}>
      <Aside>
        <ul className={styles['aside-elements']}>
          <li>
            <NavLink to="perfil" className={styles['user-element']}>
              <AiFillProfile />
              <p>Perfil</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="endereco">
              <AiFillHome />
              <p>Endereço</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="anuncios">
              <FaClipboardList />
              <p>Meus anúncios</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="compras">
              <FaShoppingCart />
              <p>Minhas Compras</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="produto/categoria"
              className={`${params['*'].includes('produto/form') ? 'active' : ''}`}
            >
              <BsFillBagCheckFill />
              <p>Adicionar produto</p>
            </NavLink>
          </li>
          <li onClick={logout} style={{ cursor: 'pointer' }}>
            <p className={styles.logout}>
              <IoLogOutSharp />
              <p>Desconectar</p>
            </p>
          </li>
        </ul>
      </Aside>

      <Routes>
        <Route path="perfil" element={<Profile userData={userData} />}></Route>
        <Route path="endereco" element={<Address userData={userData} />}></Route>
        <Route path="anuncios" element={<Adverts userData={userData} />}></Route>
        <Route path="compras" element={<Shopping userData={userData} />}></Route>
        <Route
          path="produto/categoria"
          element={
            <ProductCategory
              setCategory={setCategory}
              category={category}
              setSubcategory={setSubcategory}
            />
          }
        ></Route>
        <Route
          path="produto/form"
          element={<ProductForm category={category} subcategory={subcategory} />}
        ></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </section>
  );
};

export default User;
