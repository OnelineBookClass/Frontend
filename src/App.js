import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './main/MainPage';
import MyPage from './mypage/MyPage';


function App() {

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/mypage' element={<MyPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
