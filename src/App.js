import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './main/MainPage';
import LoginPage from './login/LoginPage';
import Kakao from './login/callback/Kakao';
import { UserContext } from './login/context/LoginContext';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loginType, setLoginType] = useState("");
  const [userId, setUserId] = useState("1234");

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <UserContext.Provider
      value={{ 
        accessToken, 
        setAccessToken: (token) => {
          setAccessToken(token);
          token ? localStorage.setItem('accessToken', token) : localStorage.removeItem('accessToken');
        },
        refreshToken, 
        setRefreshToken: (token) => {
          setRefreshToken(token);
          token ? localStorage.setItem('refreshToken', token) : localStorage.removeItem('refreshToken');
        },
        loginType, 
        setLoginType: (type) => {
          setLoginType(type);
          type ? localStorage.setItem('loginType', type) : localStorage.removeItem('loginType');
        },
        userId, 
        setUserId: (id) => {
          setUserId(id);
          id ? localStorage.setItem('userId', id) : localStorage.removeItem('userId');
        }
      }}
    >
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback/kakao" element={<Kakao />} />
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
