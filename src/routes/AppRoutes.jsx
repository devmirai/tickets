import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import EventDetail from '../pages/EventDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Confirmation from '../pages/Confirmation';

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;