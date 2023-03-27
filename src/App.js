import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Chat from './pages/Chat.jsx';
import Profile from './pages/Profile.jsx';
import {Helmet} from "react-helmet";

const App = () => (
  <BrowserRouter>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Kindness-Okpugie_Chatbox</title>
      <link rel="canonical" href="#" />
    </Helmet>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/signup' element={<Register />}></Route>
      <Route path='/chat' element={<Chat />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
