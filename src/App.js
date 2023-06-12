import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PagePlaceholder from './pages/PagePlaceholder';

const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<PagePlaceholder />}>
              <Route index element={<Home />} />
          </Route>
      </Routes>
  </>
  );
};

export default App;
