import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Tabs, Row, Col, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials, RegisterData } from '../types/auth';

const { Title, Text, Link } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Login = () => {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('login');
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/profile';

  const handleLogin = async (values: LoginCredentials) => {
    const success = await login(values);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleRegister = async (values: RegisterData) => {
    const success = await register(values);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Title level={2} className="text-gray-900">TicketHub</Title>
          <Text className="text-gray-600">Accede a tu cuenta o crea una nueva</Text>
        </div>

        <Card className="shadow-lg">
          <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
            <TabPane tab="Iniciar Sesión" key="login">
              <Form
                form={loginForm}
                name="login"
                onFinish={handleLogin}
                layout="vertical"
                size="large"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu email' },
                    { type: 'email', message: 'Email inválido' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="tu@email.com"
                  />
                </Form.Item>

                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Tu contraseña"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    loading={isLoading}
                  >
                    Iniciar Sesión
                  </Button>
                </Form.Item>

                <div className="text-center text-sm text-gray-600">
                  <Text>Demo: user@tickethub.com / password123</Text>
                  <br />
                  <Text>Demo empresa: empresa@tickethub.com / password123</Text>
                </div>
              </Form>
            </TabPane>

            <TabPane tab="Registrarse" key="register">
              <Form
                form={registerForm}
                name="register"
                onFinish={handleRegister}
                layout="vertical"
                size="large"
              >
                <Form.Item
                  label="Tipo de Cuenta"
                  name="userType"
                  rules={[{ required: true, message: 'Selecciona el tipo de cuenta' }]}
                  initialValue="customer"
                >
                  <Select placeholder="Selecciona tipo de cuenta">
                    <Option value="customer">
                      <UserOutlined className="mr-2" />
                      Cliente
                    </Option>
                    <Option value="company">
                      <TeamOutlined className="mr-2" />
                      Empresa
                    </Option>
                  </Select>
                </Form.Item>

                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item
                      label="Nombre"
                      name="firstName"
                      rules={[{ required: true, message: 'Ingresa tu nombre' }]}
                    >
                      <Input placeholder="Juan" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Apellido"
                      name="lastName"
                      rules={[{ required: true, message: 'Ingresa tu apellido' }]}
                    >
                      <Input placeholder="Pérez" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.userType !== currentValues.userType
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue('userType') === 'company' ? (
                      <Form.Item
                        label="Nombre de la Empresa"
                        name="companyName"
                        rules={[{ required: true, message: 'Ingresa el nombre de tu empresa' }]}
                      >
                        <Input
                          prefix={<TeamOutlined />}
                          placeholder="Mi Empresa SA"
                        />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu email' },
                    { type: 'email', message: 'Email inválido' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="tu@email.com"
                  />
                </Form.Item>

                <Form.Item
                  label="Teléfono"
                  name="phone"
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="+1 234 567 8900"
                  />
                </Form.Item>

                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                    { required: true, message: 'Por favor ingresa una contraseña' },
                    { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mínimo 6 caracteres"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    loading={isLoading}
                  >
                    Crear Cuenta
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Card>

        <div className="text-center">
          <Link onClick={() => navigate('/')} className="text-blue-600">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
