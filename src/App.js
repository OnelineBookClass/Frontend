import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './main/MainPage';


function App() {

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
