import { useState, useEffect } from 'react';
import { Card, Typography, Button, Tabs, Table, Tag, Space, Empty, message, Modal, Row, Col, Divider, QRCode } from 'antd';
import { 
  UserOutlined, 
  ShoppingOutlined, 
  CreditCardOutlined, 
  TeamOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LogoutOutlined,
  EyeOutlined,
  DownloadOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { UserTicket, PaymentMethod, EventPurchaser } from '../types/auth';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userTickets, setUserTickets] = useState<UserTicket[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [eventPurchasers, setEventPurchasers] = useState<EventPurchaser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<UserTicket | null>(null);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadUserData();
  }, [user, navigate]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      if (user.userType === 'customer') {
        const [tickets, methods] = await Promise.all([
          authService.getUserTickets(user.id),
          authService.getPaymentMethods(user.id)
        ]);
        setUserTickets(tickets);
        setPaymentMethods(methods);
      } else {
        // For company - load purchasers for all events (mock)
        const purchasers = await authService.getEventPurchasers('all');
        setEventPurchasers(purchasers);
      }
    } catch (error) {
      message.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewTicket = (ticket: UserTicket) => {
    setSelectedTicket(ticket);
    setTicketModalVisible(true);
  };

  const handleDownloadTicket = (ticket: UserTicket) => {
    // Simular descarga de ticket
    const ticketData = {
      eventName: ticket.eventName,
      date: new Date(ticket.eventDate).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      location: ticket.eventLocation,
      ticketNumber: ticket.ticketNumber,
      quantity: ticket.quantity,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticket.ticketNumber}`
    };

    const ticketContent = `
      =============================================
                    TICKETHUB
      =============================================
      
      EVENTO: ${ticketData.eventName}
      FECHA: ${ticketData.date}
      LUGAR: ${ticketData.location}
      BOLETOS: ${ticketData.quantity}
      
      NÚMERO DE TICKET: ${ticketData.ticketNumber}
      
      =============================================
      Presenta este ticket en la entrada del evento
      =============================================
    `;

    const element = document.createElement('a');
    const file = new Blob([ticketContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ticket_${ticket.ticketNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    message.success('Ticket descargado correctamente');
  };

  const formatTicketDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return null;
  }

  const ticketColumns = [
    {
      title: 'Evento',
      dataIndex: 'eventName',
      key: 'eventName',
      render: (text: string, record: UserTicket) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text className="text-gray-500 text-sm">{record.ticketNumber}</Text>
        </div>
      ),
    },
    {
      title: 'Fecha',
      dataIndex: 'eventDate',
      key: 'eventDate',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
    },
    {
      title: 'Ubicación',
      dataIndex: 'eventLocation',
      key: 'eventLocation',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'valid' ? 'green' : status === 'used' ? 'orange' : 'red'}>
          {status === 'valid' ? 'Válido' : status === 'used' ? 'Usado' : 'Cancelado'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: UserTicket) => (
        <Space>
          <Button 
            size="small" 
            type="primary" 
            icon={<EyeOutlined />}
            onClick={() => handleViewTicket(record)}
          >
            Ver
          </Button>
          <Button 
            size="small" 
            icon={<DownloadOutlined />}
            onClick={() => handleDownloadTicket(record)}
          >
            Descargar
          </Button>
        </Space>
      ),
    }
  ];

  const paymentColumns = [
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type: string, record: PaymentMethod) => (
        <div className="flex items-center">
          <CreditCardOutlined className="mr-2" />
          {type === 'credit-card' ? `${record.cardType} ****${record.lastFour}` :
           type === 'paypal' ? 'PayPal' : 'Apple Pay'}
        </div>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (isDefault: boolean) => (
        isDefault ? <Tag color="blue">Predeterminado</Tag> : null
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any) => (
        <Space>
          <Button size="small" icon={<EditOutlined />}>Editar</Button>
          <Button 
            size="small" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => message.info('Función disponible próximamente')}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const purchaserColumns = [
    {
      title: 'Cliente',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text: string, record: EventPurchaser) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text className="text-gray-500 text-sm">{record.email}</Text>
        </div>
      ),
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Pagado',
      dataIndex: 'totalPaid',
      key: 'totalPaid',
      render: (amount: number) => `$${amount}`,
    },
    {
      title: 'Fecha de Compra',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
    },
    {
      title: 'Orden',
      dataIndex: 'orderId',
      key: 'orderId',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <Title level={2} className="mb-2">
              {user.userType === 'customer' ? (
                <><UserOutlined className="mr-2" />Mi Perfil</>
              ) : (
                <><TeamOutlined className="mr-2" />Panel de Empresa</>
              )}
            </Title>
            <Text className="text-gray-600 text-lg">
              Bienvenido, {user.firstName} {user.lastName}
              {user.companyName && <span className="ml-2">({user.companyName})</span>}
            </Text>
          </div>
          <Button 
            danger 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <Card>
        {user.userType === 'customer' ? (
          <Tabs defaultActiveKey="tickets">
            <TabPane 
              tab={<span><ShoppingOutlined />Mis Tickets</span>} 
              key="tickets"
            >
              {userTickets.length > 0 ? (
                <Table
                  columns={ticketColumns}
                  dataSource={userTickets}
                  rowKey="id"
                  loading={loading}
                  pagination={{ pageSize: 10 }}
                />
              ) : (
                <Empty 
                  description="No tienes tickets aún"
                  className="my-8"
                >
                  <Button type="primary" onClick={() => navigate('/')}>
                    Explorar Eventos
                  </Button>
                </Empty>
              )}
            </TabPane>

            <TabPane 
              tab={<span><CreditCardOutlined />Métodos de Pago</span>} 
              key="payment"
            >
              <div className="mb-4">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => message.info('Función disponible próximamente')}
                >
                  Agregar Método de Pago
                </Button>
              </div>
              
              {paymentMethods.length > 0 ? (
                <Table
                  columns={paymentColumns}
                  dataSource={paymentMethods}
                  rowKey="id"
                  loading={loading}
                  pagination={false}
                />
              ) : (
                <Empty 
                  description="No tienes métodos de pago guardados"
                  className="my-8"
                />
              )}
            </TabPane>
          </Tabs>
        ) : (
          <Tabs defaultActiveKey="events">
            <TabPane 
              tab={<span><ShoppingOutlined />Mis Eventos</span>} 
              key="events"
            >
              <div className="mb-4">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => message.info('Función disponible próximamente')}
                >
                  Crear Nuevo Evento
                </Button>
              </div>
              
              <Empty 
                description="Gestión de eventos disponible próximamente"
                className="my-8"
              />
            </TabPane>

            <TabPane 
              tab={<span><TeamOutlined />Compradores</span>} 
              key="purchasers"
            >
              {eventPurchasers.length > 0 ? (
                <Table
                  columns={purchaserColumns}
                  dataSource={eventPurchasers}
                  rowKey="id"
                  loading={loading}
                  pagination={{ pageSize: 10 }}
                />
              ) : (
                <Empty 
                  description="No hay compradores aún"
                  className="my-8"
                />
              )}
            </TabPane>
          </Tabs>
        )}
      </Card>

      {/* Modal para ver detalles del ticket */}
      <Modal
        title="Detalles del Ticket"
        open={ticketModalVisible}
        onCancel={() => setTicketModalVisible(false)}
        width={600}
        footer={[
          <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={() => selectedTicket && handleDownloadTicket(selectedTicket)}>
            Descargar Ticket
          </Button>,
          <Button key="close" onClick={() => setTicketModalVisible(false)}>
            Cerrar
          </Button>
        ]}
      >
        {selectedTicket && (
          <div className="space-y-6">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{selectedTicket.eventName}</h3>
                    <div className="text-blue-100">
                      <CalendarOutlined className="mr-2" />
                      {formatTicketDate(selectedTicket.eventDate)}
                    </div>
                    <div className="text-blue-100">
                      <EnvironmentOutlined className="mr-2" />
                      {selectedTicket.eventLocation}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedTicket.quantity}</div>
                    <div className="text-gray-500">Boleto{selectedTicket.quantity > 1 ? 's' : ''}</div>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${selectedTicket.totalPrice}</div>
                    <div className="text-gray-500">Total Pagado</div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Divider />

            <div className="text-center">
              <div className="mb-4">
                <strong>Número de Ticket:</strong>
                <div className="text-lg font-mono bg-gray-100 p-2 rounded mt-1">
                  {selectedTicket.ticketNumber}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-center">
                  <QRCode 
                    value={selectedTicket.ticketNumber} 
                    size={150}
                    style={{ margin: '0 auto' }}
                  />
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Presenta este código QR en la entrada
                </div>
              </div>

              <Tag 
                color={selectedTicket.status === 'valid' ? 'green' : selectedTicket.status === 'used' ? 'orange' : 'red'}
                className="text-sm px-3 py-1"
              >
                {selectedTicket.status === 'valid' ? 'Válido' : selectedTicket.status === 'used' ? 'Usado' : 'Cancelado'}
              </Tag>
            </div>

            <div className="text-xs text-gray-500 text-center mt-4">
              Comprado el {new Date(selectedTicket.purchaseDate).toLocaleDateString('es-ES')}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
