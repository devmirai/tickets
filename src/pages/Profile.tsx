// src/pages/Profile.tsx
import { useState, useEffect } from 'react';
import { Card, Typography, Button, Tabs, Table, Tag, Space, Empty, message, Modal, Row, Col, Divider, QRCode, Form, Input, Checkbox, InputNumber, Select } from 'antd';
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
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm(); // <-- Añade esta línea
  const [userTickets, setUserTickets] = useState<UserTicket[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [eventPurchasers, setEventPurchasers] = useState<EventPurchaser[]>([]);
  const [companyEvents, setCompanyEvents] = useState<any[]>([]);
  const [companyBuyers, setCompanyBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<UserTicket | null>(null);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [addPaymentModalVisible, setAddPaymentModalVisible] = useState(false);
  const [addPaymentLoading, setAddPaymentLoading] = useState(false);
  const [createEventModalVisible, setCreateEventModalVisible] = useState(false);
  const [createEventLoading, setCreateEventLoading] = useState(false);

  const currentMonth = dayjs().month() + 1; // month() es 0-indexed
  const currentYear = dayjs().year();

  const minMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const minYear = currentMonth === 12 ? currentYear + 1 : currentYear;

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
        const token = localStorage.getItem('tickethub_token');
        // Tickets
        const response = await fetch('http://localhost:5000/api/users/tickets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (response.ok && result.tickets && Array.isArray(result.tickets)) {
          setUserTickets(result.tickets);
        } else {
          setUserTickets([]);
        }
        // Métodos de pago
        const pmResponse = await fetch('http://localhost:5000/api/users/payment-methods', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const pmResult = await pmResponse.json();
        // Ajuste para el formato del backend
        if (
          Array.isArray(pmResult) &&
          pmResult.length > 0 &&
          Array.isArray(pmResult[0].paymentMethods)
        ) {
          setPaymentMethods(pmResult[0].paymentMethods);
        } else {
          setPaymentMethods([]);
        }
      } else {
        const token = localStorage.getItem('tickethub_token');
        // Eventos de la empresa
        const eventsResp = await fetch('http://localhost:5000/api/company/events', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const eventsJson = await eventsResp.json();
        setCompanyEvents(eventsJson.events || []);
        // Compradores
        const buyersResp = await fetch('http://localhost:5000/api/company/buyers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const buyersJson = await buyersResp.json();
        setCompanyBuyers(buyersJson.buyers || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
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

  const handleAddPaymentMethod = async (values: any) => {
    setAddPaymentLoading(true);
    try {
      const token = localStorage.getItem('tickethub_token');
      const response = await fetch('http://localhost:5000/api/users/payment-methods', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'CREDIT_CARD',
          provider: values.provider,
          cardType: values.cardType,
          cardholderName: values.cardholderName,
          expiryMonth: values.expiryMonth,
          expiryYear: values.expiryYear,
          isDefault: values.isDefault || false,
          cardNumber: values.cardNumber
        })
      });
      const result = await response.json();
      if (response.ok && result.paymentMethod) {
        message.success(result.message || 'Método de pago agregado correctamente');
        setAddPaymentModalVisible(false);
        // Actualiza la lista de métodos de pago agregando el nuevo método
        setPaymentMethods(prev => [...prev, result.paymentMethod]);
      } else {
        message.error(result.message || 'Error al agregar método de pago');
      }
    } catch (error) {
      message.error('Error al agregar método de pago');
    } finally {
      setAddPaymentLoading(false);
    }
  };

  const handleDeletePaymentMethod = async (id: string | number) => {
    Modal.confirm({
      title: '¿Eliminar método de pago?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          const token = localStorage.getItem('tickethub_token');
          const response = await fetch(`http://localhost:5000/api/users/payment-methods/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const result = await response.json();
          if (response.ok && result.success !== false) {
            message.success('Método de pago eliminado');
            setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
          } else {
            message.error(result.message || 'No se pudo eliminar el método de pago');
          }
        } catch (error) {
          message.error('Error al eliminar método de pago');
        }
      }
    });
  };

  const handleCreateEvent = async (values: any) => {
    setCreateEventLoading(true);
    try {
      const token = localStorage.getItem('tickethub_token');
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          eventDate: values.eventDate,
          venue: values.venue,
          address: values.address,
          city: values.city,
          country: values.country,
          category: values.category,
          totalTickets: Number(values.totalTickets),
          basePrice: Number(values.basePrice),
          isActive: true
        })
      });
      const result = await response.json();
      if (response.ok && result) {
        message.success('Evento creado correctamente');
        setCreateEventModalVisible(false);
        loadUserData();
      } else {
        message.error(result.message || 'Error al crear evento');
      }
    } catch (error) {
      message.error('Error al crear evento');
    } finally {
      setCreateEventLoading(false);
    }
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
      render: (price: number) => `S/${price}`,
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
      render: (type: string, record: PaymentMethod) => {
        let lastFour = '';
        if (record.cardNumber && typeof record.cardNumber === 'string') {
          lastFour = record.cardNumber.slice(-4);
        }
        return (
          <div className="flex items-center">
            <CreditCardOutlined className="mr-2" />
            {type === 'credit-card' || type === 'credit_card'
              ? `${record.cardType || 'Tarjeta'} ****${lastFour}`
              : type === 'paypal'
                ? 'PayPal'
                : 'Apple Pay'}
          </div>
        );
      },
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
      render: (_: any, record: PaymentMethod) => (
        <Space>
          <Button 
            size="small" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeletePaymentMethod(record.id)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const buyersColumns = [
    { title: 'Cliente', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Tickets',
      key: 'tickets',
      render: (_: any, record: any) => (
        <ul>
          {record.tickets.map((t: any) => (
            <li key={t.ticketId}>
              <strong>{t.eventName}</strong> - {t.quantity} boleto(s) - {new Date(t.purchaseDate).toLocaleDateString('es-ES')} - <span className="font-mono">{t.ticketNumber}</span> - <span>${t.totalPaid}</span>
            </li>
          ))}
        </ul>
      )
    }
  ];

  const companyEventColumns = [
    { title: 'Evento', dataIndex: 'title', key: 'title' },
    { title: 'Fecha', dataIndex: 'eventDate', key: 'eventDate', render: (date: string) => new Date(date).toLocaleString('es-ES') },
    { title: 'Lugar', dataIndex: 'venue', key: 'venue' },
    { title: 'Categoría', dataIndex: 'category', key: 'category' },
    { title: 'Boletos', dataIndex: 'totalTickets', key: 'totalTickets' },
    { title: 'Precio Base', dataIndex: 'basePrice', key: 'basePrice', render: (price: string) => `S/${Number(price).toLocaleString()}` },
    { title: 'Estado', dataIndex: 'isActive', key: 'isActive', render: (active: boolean) => active ? <Tag color="green">Activo</Tag> : <Tag color="red">Inactivo</Tag> }
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
            <Tabs.TabPane 
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
            </Tabs.TabPane>

            <Tabs.TabPane 
              tab={<span><CreditCardOutlined />Métodos de Pago</span>} 
              key="payment"
            >
              <div className="mb-4">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setAddPaymentModalVisible(true)}
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
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <Tabs defaultActiveKey="events">
            <Tabs.TabPane 
              tab={<span><ShoppingOutlined />Mis Eventos</span>} 
              key="events"
            >
              <div className="mb-4">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setCreateEventModalVisible(true)}
                >
                  Crear Nuevo Evento
                </Button>
              </div>
              
              {companyEvents.length > 0 ? (
                <Table
                  columns={companyEventColumns}
                  dataSource={companyEvents}
                  rowKey="id"
                  loading={loading}
                  pagination={{ pageSize: 10 }}
                />
              ) : (
                <Empty 
                  description="No tienes eventos registrados"
                  className="my-8"
                />
              )}
            </Tabs.TabPane>

            <Tabs.TabPane 
              tab={<span><TeamOutlined />Compradores</span>} 
              key="buyers"
            >
              {companyBuyers.length > 0 ? (
                <Table
                  columns={buyersColumns}
                  dataSource={companyBuyers}
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
            </Tabs.TabPane>
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
                    <div className="text-2xl font-bold text-green-600">S/{selectedTicket.totalPrice}</div>
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

      {/* Modal para agregar método de pago */}
      <Modal
        title="Agregar Método de Pago"
        open={addPaymentModalVisible}
        onCancel={() => setAddPaymentModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddPaymentMethod}>
          <Form.Item
            name="provider"
            label="Proveedor"
            rules={[{ required: true, message: 'Selecciona el proveedor' }]
          }
          >
            <Select placeholder="Selecciona proveedor">
              <Select.Option value="Visa">Visa</Select.Option>
              <Select.Option value="Mastercard">Mastercard</Select.Option>
              <Select.Option value="Diners">Diners Club</Select.Option>
              <Select.Option value="American Express">American Express</Select.Option>
              <Select.Option value="Discover">Discover</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="cardType"
            label="Tipo de Tarjeta"
            rules={[{ required: true, message: 'Selecciona el tipo de tarjeta' }]
          }
          >
            <Select placeholder="Selecciona tipo">
              <Select.Option value="Crédito">Crédito</Select.Option>
              <Select.Option value="Débito">Débito</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="cardholderName" label="Nombre del Titular" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="expiryMonth"
            label="Mes de Vencimiento"
            rules={[
              { required: true, message: 'El mes es obligatorio' },
              {
                validator: (_, value) => {
                  const year = form.getFieldValue('expiryYear');
                  // Si el año es el actual, solo permitir meses mayores al actual
                  if (year === currentYear) {
                    if (currentMonth === 12) {
                      return Promise.reject('Fecha no valida.');
                    }
                    if (value <= currentMonth || value > 12) {
                      return Promise.reject(`Fecha no valida.`);
                    }
                    return Promise.resolve();
                  }
                  // Si el año es el siguiente, permitir cualquier mes (1-12)
                  if (year === currentYear + 1 && value >= 1 && value <= 12) {
                    return Promise.resolve();
                  }
                  // Si el año es mayor al siguiente, permitir cualquier mes (1-12)
                  if (year > currentYear + 1 && value >= 1 && value <= 12) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Fecha de vencimiento inválida');
                }
              }
            ]}
          >
            <InputNumber min={1} max={12} placeholder="Ej: 9" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="expiryYear"
            label="Año de Vencimiento"
            rules={[
              { required: true, message: 'El año es obligatorio' },
              {
                validator: (_, value) => {
                  if (typeof value !== 'number' || value < currentYear) {
                    return Promise.reject(`El año debe ser ${currentYear} o mayor`);
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <InputNumber min={currentYear} placeholder={`Ej: ${currentYear + 1}`} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="cardNumber" label="Número de Tarjeta" rules={[{ required: true, len: 16 }]}>
            <Input maxLength={16} />
          </Form.Item>
          <Form.Item name="isDefault" label="¿Predeterminado?" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={addPaymentLoading}>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para crear nuevo evento */}
      <Modal
        title="Crear Nuevo Evento"
        open={createEventModalVisible}
        onCancel={() => setCreateEventModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreateEvent}>
          <Form.Item name="title" label="Título" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Descripción" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="eventDate"
            label="Fecha y Hora"
            rules={[
              { required: true, message: 'La fecha es obligatoria' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.reject('La fecha es obligatoria');
                  const inputDate = new Date(value);
                  const now = new Date();
                  // Solo permitir fechas de mañana en adelante
                  now.setHours(0, 0, 0, 0);
                  const minDate = new Date(now);
                  minDate.setDate(minDate.getDate() + 1);
                  if (inputDate < minDate) {
                    return Promise.reject('La fecha debe ser al menos un día después de hoy');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item name="venue" label="Lugar" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Dirección" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="Ciudad" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="country" label="País" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Categoría" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="totalTickets" label="Total de Boletos" rules={[{ required: true, type: 'number', min: 1 }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="basePrice" label="Precio Base" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={createEventLoading}>
              Crear Evento
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;