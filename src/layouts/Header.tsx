import { useState, useEffect } from 'react';
import { Layout, Badge, Button } from 'antd';
import { ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cartUtils } from '../utils/cartUtils';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    updateCartCount();
    // Listen for custom cart update events
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateCartCount = () => {
    setCartCount(cartUtils.getCartItemsCount());
  };

  return (
    <AntHeader className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 mr-4">
            TicketHub
          </Link>
          <Button
            type="text"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            className={`flex items-center ${location.pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
          >
            Inicio
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge count={cartCount} showZero>
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate('/cart')}
              className="flex items-center"
            >
              Carrito
            </Button>
          </Badge>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;