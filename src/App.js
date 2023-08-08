import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import './Css/ReusablesCss/Geral.css';
import Header from './Components/Header';
import Home from './Components/Home/Home';
import { UserContext } from './UserContext';
import User from './Components/User/User';
import Product from './Components/Products/Product';
import UserPage from './Components/User/UserPage/UserPage';
import Products from './Components/Products/Products';
import Favorites from './Components/User/FavoriteProducts/Favorites';
import Transaction from './Components/Products/Transaction';
import Footer from './Components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <UserContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login/*" element={<Login />}></Route>
          <Route path="conta/*" element={<User />}></Route>
          <Route path="produto/:categoria/:slug" element={<Product />}></Route>
          <Route path="produtos/:categoria/*" element={<Products />}></Route>
          <Route path="produtos" element={<Products />}></Route>
          <Route path="favoritos" element={<Favorites />}></Route>
          <Route path="usuario/:user/*" element={<UserPage />}></Route>
          <Route path="transacao/:slug" element={<Transaction />}></Route>
        </Routes>
        <Footer />
      </UserContext>
    </BrowserRouter>
  );
};

export default App;
