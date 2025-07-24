import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  InputNumber, 
  Typography, 
  Space, 
  Card, 
  Empty, 
  Popconfirm,
  message,
  Divider,
  Image
} from 'antd';
import { 
  DeleteOutlined, 
  ShoppingOutlined, 
  ClearOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { cartUtils } from '../utils/cartUtils';

const { Title, Text } = Typography;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = cartUtils.getCart();
    setCartItems(items);
  };

  const updateQuantity = (eventId, newQuantity) => {
    setLoading(true);
    const updatedCart = cartUtils.updateQuantity(eventId, newQuantity);
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
    message.success('Cart updated');
    setLoading(false);
  };

  const removeItem = (eventId) => {
    setLoading(true);
    const updatedCart = cartUtils.removeFromCart(eventId);
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
    message.success('Item removed from cart');
    setLoading(false);
  };

  const clearCart = () => {
    setLoading(true);
    cartUtils.clearCart();
    setCartItems([]);
    window.dispatchEvent(new Event('cartUpdated'));
    message.success('Cart cleared');
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const columns = [
    {
      title: 'Event',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-4">
          <Image
            width={80}
            height={60}
            src={record.image}
            alt={record.name}
            className="rounded object-cover"
            preview={false}
          />
          <div>
            <Text strong className="text-lg">{record.name}</Text>
            <div className="text-gray-500 text-sm">
              <div>{formatDate(record.date)}</div>
              <div>{record.location}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <Text strong className="text-lg text-blue-600">S/{price}</Text>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={10}
          value={quantity}
          onChange={(value) => updateQuantity(record.id, value)}
          disabled={loading}
          className="w-20"
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (total) => (
        <Text strong className="text-xl text-green-600">S/{total}</Text>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Remove this item?"
          description="Are you sure you want to remove this item from your cart?"
          onConfirm={() => removeItem(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            disabled={loading}
          >
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const cartTotal = cartUtils.getCartTotal();
  const itemCount = cartUtils.getCartItemsCount();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <Title level={3} className="text-gray-500">Your cart is empty</Title>
                <Text className="text-gray-400">
                  Discover amazing events and start building your perfect experience!
                </Text>
              </div>
            }
          >
            <Button 
              type="primary" 
              size="large" 
              onClick={() => navigate('/')}
              className="mt-4"
            >
              Browse Events
            </Button>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          Continue Shopping
        </Button>
        
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} className="text-gray-800 mb-2">Shopping Cart</Title>
            <Text className="text-gray-600 text-lg">
              {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
            </Text>
          </div>
          
          {cartItems.length > 0 && (
            <Popconfirm
              title="Clear entire cart?"
              description="This will remove all items from your cart. This action cannot be undone."
              onConfirm={clearCart}
              okText="Yes, clear cart"
              cancelText="Cancel"
            >
              <Button 
                danger 
                icon={<ClearOutlined />}
                disabled={loading}
              >
                Clear Cart
              </Button>
            </Popconfirm>
          )}
        </div>
      </div>

      {/* Cart Table */}
      <Card className="mb-8 shadow-md">
        <Table
          columns={columns}
          dataSource={cartItems}
          rowKey="id"
          pagination={false}
          loading={loading}
          className="overflow-x-auto"
        />
      </Card>

      {/* Cart Summary */}
      <Card className="bg-gray-50 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <Title level={3} className="text-gray-800 mb-2">Order Summary</Title>
            <div className="space-y-2">
              <div className="flex justify-between items-center min-w-[200px]">
                <Text className="text-gray-600">Subtotal:</Text>
                <Text strong className="text-lg">S/{cartTotal}</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text className="text-gray-600">Service Fee:</Text>
                <Text strong className="text-lg">S/5.00</Text>
              </div>
              <Divider className="my-3" />
              <div className="flex justify-between items-center">
                <Text strong className="text-xl">Total:</Text>
                <Text strong className="text-2xl text-blue-600">
                  S/{cartTotal + 5}
                </Text>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3 w-full md:w-auto">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingOutlined />}
              onClick={() => navigate('/checkout')}
              className="w-full md:w-48 h-12 text-lg font-semibold"
            >
              Proceed to Checkout
            </Button>
            
            <Button
              size="large"
              onClick={() => navigate('/')}
              className="w-full md:w-48 h-12"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cart;