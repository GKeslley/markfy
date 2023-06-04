import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import './Css/ReusablesCss/Geral.css';
import Header from './Components/Header';
import Home from './Components/Home/Home';
import { UserContext } from './Hooks/UserContext';
import Conta from './Components/User/Conta';
import Product from './Components/Products/Product';
import UserPage from './Components/User/UserPage/UserPage';
import Products from './Components/Products/Products';

const App = () => {
  const [dataProduct, setDataProduct] = React.useState(null);
  return (
    <BrowserRouter>
      <UserContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home setDataProduct={setDataProduct} />}></Route>
          <Route path="login/*" element={<Login />}></Route>
          <Route path="conta/*" element={<Conta />}></Route>
          <Route
            path="produto/:categoria/:slug"
            element={<Product dataProduct={dataProduct} />}
          ></Route>
          <Route path="produtos/:categoria/*" element={<Products />}></Route>
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
};

export default App;
