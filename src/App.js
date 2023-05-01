import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={}></Route> */}
        <Route path="login/*" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
