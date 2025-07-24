import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import EventDetail from '../pages/EventDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Confirmation from '../pages/Confirmation';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Help from '../pages/Help';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Refunds from '../pages/Refunds';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta de login sin layout */}
        <Route path="/login" element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        } />
        
        {/* Rutas con layout */}
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/refunds" element={<Refunds />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;