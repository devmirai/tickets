import React, { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Button, Input } from 'antd';
import { ShoppingCartOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cartUtils } from '../utils/cartUtils';

const { Header: AntHeader } = Layout;
const { Search } = Input;

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

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/?search=${encodeURIComponent(value.trim())}`);
    }
  };

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/cart') return 'cart';
    return 'home';
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
  ];

  return (
    <AntHeader className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 mr-8">
            TicketHub
          </Link>
          <Menu
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            className="border-none"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge count={cartCount} showZero>
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate('/cart')}
              className="flex items-center"
            >
              Cart
            </Button>
          </Badge>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;