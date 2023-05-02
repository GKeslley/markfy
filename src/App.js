import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import './Css/ReusablesCss/Geral.css';
import Header from './Components/Header';
import Home from './Components/Home/Home';
import { UserContext } from './Hooks/UserContext';

const App = () => {
  return (
    <BrowserRouter>
      <UserContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login/*" element={<Login />}></Route>
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
};

export default App;
