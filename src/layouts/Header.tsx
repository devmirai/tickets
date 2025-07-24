import { useState, useEffect } from 'react';
import { Layout, Badge, Button, Avatar, Dropdown, Typography } from 'antd';
import { ShoppingCartOutlined, HomeOutlined, UserOutlined, LoginOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cartUtils } from '../utils/cartUtils';
import { useAuth } from '../contexts/AuthContext';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Mi Perfil',
      icon: user?.userType === 'company' ? <TeamOutlined /> : <UserOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      label: 'Cerrar Sesión',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

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

          {user ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button
                type="text"
                className="flex items-center"
              >
                <Avatar 
                  size="small" 
                  icon={user.userType === 'company' ? <TeamOutlined /> : <UserOutlined />}
                  className="mr-2"
                />
                {user.firstName}
              </Button>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;