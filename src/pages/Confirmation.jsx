import React, { useEffect, useState } from 'react';
import { Result, Button, Card, Typography, Divider, Space, Tag } from 'antd';
import { CheckCircleOutlined, DownloadOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const Confirmation = () => {
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    } else {
      navigate('/'); // Redirect if no order data
    }
  }, [navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadTickets = () => {
    // Simulate ticket download
    const ticketData = {
      orderId: orderData.orderId,
      customerName: `${orderData.firstName} ${orderData.lastName}`,
      events: orderData.cartItems,
      purchaseDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(ticketData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `tickets-${orderData.orderId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!orderData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Result
          status="404"
          title="Order Not Found"
          subTitle="We couldn't find your order information."
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              Back Home
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Result
        icon={<CheckCircleOutlined className="text-green-500" />}
        title="Payment Successful!"
        subTitle={`Order #${orderData.orderId} has been confirmed`}
        extra={[
          <Button key="download" icon={<DownloadOutlined />} onClick={handleDownloadTickets}>
            Download Tickets
          </Button>,
          <Button key="home" type="primary" icon={<HomeOutlined />} onClick={() => navigate('/')}>
            Back to Home
          </Button>
        ]}
      />

      <Card className="shadow-md mb-6">
        <Title level={3} className="mb-4">Order Details</Title>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Information */}
          <div>
            <Title level={5} className="text-gray-700 mb-3">Customer Information</Title>
            <div className="space-y-2">
              <div>
                <Text strong>Name: </Text>
                <Text>{orderData.firstName} {orderData.lastName}</Text>
              </div>
              <div>
                <Text strong>Email: </Text>
                <Text>{orderData.email}</Text>
              </div>
              <div>
                <Text strong>Phone: </Text>
                <Text>{orderData.phone}</Text>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div>
            <Title level={5} className="text-gray-700 mb-3">Order Information</Title>
            <div className="space-y-2">
              <div>
                <Text strong>Order ID: </Text>
                <Text code>{orderData.orderId}</Text>
              </div>
              <div>
                <Text strong>Order Date: </Text>
                <Text>{formatDate(orderData.orderDate)}</Text>
              </div>
              <div>
                <Text strong>Payment Method: </Text>
                <Tag color="blue">
                  {orderData.paymentMethod === 'credit-card' ? 'Credit Card' : 
                   orderData.paymentMethod === 'paypal' ? 'PayPal' : 
                   'Apple Pay'}
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Event Tickets */}
      <Card className="shadow-md mb-6">
        <Title level={3} className="mb-4">Your Tickets</Title>
        
        <div className="space-y-4">
          {orderData.cartItems.map(item => (
            <Card key={item.id} className="bg-gray-50 border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <Title level={5} className="mb-1">{item.name}</Title>
                    <Text className="text-gray-600">{formatDate(item.date)}</Text>
                    <div className="text-gray-600">{item.location}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-blue-600">
                    {item.quantity} × ${item.price} = ${item.totalPrice}
                  </div>
                  <Text className="text-gray-500">
                    {item.quantity} ticket{item.quantity > 1 ? 's' : ''}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Payment Summary */}
      <Card className="shadow-md">
        <Title level={3} className="mb-4">Payment Summary</Title>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <Text>Subtotal:</Text>
            <Text strong>${orderData.orderTotal - 5}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Service Fee:</Text>
            <Text strong>$5.00</Text>
          </div>
          <Divider />
          <div className="flex justify-between">
            <Title level={4}>Total Paid:</Title>
            <Title level={4} className="text-green-600">${orderData.orderTotal}</Title>
          </div>
        </div>
      </Card>

      <Card className="bg-blue-50 border-blue-200 mt-6">
        <div className="flex items-start space-x-3">
          <MailOutlined className="text-blue-500 mt-1" />
          <div>
            <Title level={5} className="text-blue-800 mb-2">What's Next?</Title>
            <Paragraph className="text-blue-700 mb-0">
              A confirmation email with your tickets has been sent to <strong>{orderData.email}</strong>. 
              Please check your email and save your tickets. You can also download them using the button above.
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Confirmation;