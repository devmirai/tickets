# 💳 Componente de Simulación de Pagos - Frontend

## Componente PaymentSimulator.tsx

```typescript
import React, { useState } from 'react';
import { Modal, Button, Card, Typography, Space, Alert, Spin } from 'antd';
import { CreditCardOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface PaymentSimulatorProps {
  visible: boolean;
  orderId: string;
  amount: number;
  paymentMethod: {
    type: string;
    lastFour: string;
    cardType: string;
  };
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export const PaymentSimulator: React.FC<PaymentSimulatorProps> = ({
  visible,
  orderId,
  amount,
  paymentMethod,
  onSuccess,
  onError,
  onCancel
}) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'result'>('form');

  const simulatePayment = async (success: boolean) => {
    setLoading(true);
    setStep('processing');

    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response = await fetch('/api/payments/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          orderId,
          amount,
          simulateSuccess: success
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStep('result');
        setTimeout(() => {
          onSuccess(result.data);
          setLoading(false);
        }, 1000);
      } else {
        setStep('result');
        setTimeout(() => {
          onError(result.error?.message || 'Error en el pago simulado');
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      onError('Error de conexión con el simulador de pagos');
    }
  };

  const renderForm = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <CreditCardOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
        <Title level={3}>Simulador de Pagos</Title>
        <Text type="secondary">Para efectos de demostración</Text>
      </div>

      <Card>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Orden:</Text>
            <Text>{orderId}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Monto:</Text>
            <Text style={{ fontSize: '18px', color: '#1890ff' }}>
              ${amount.toFixed(2)}
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Método:</Text>
            <Text>{paymentMethod.cardType} ****{paymentMethod.lastFour}</Text>
          </div>
        </Space>
      </Card>

      <Alert
        message="Simulación de Pago"
        description="Puedes elegir si el pago será exitoso o fallará para probar ambos escenarios."
        type="info"
        showIcon
      />

      <Space style={{ width: '100%', justifyContent: 'center' }}>
        <Button
          type="primary"
          size="large"
          icon={<CheckCircleOutlined />}
          onClick={() => simulatePayment(true)}
          style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
        >
          ✅ Simular Pago Exitoso
        </Button>
        <Button
          danger
          size="large"
          icon={<CloseCircleOutlined />}
          onClick={() => simulatePayment(false)}
        >
          ❌ Simular Pago Fallido
        </Button>
      </Space>
    </Space>
  );

  const renderProcessing = () => (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <Spin size="large" />
      <Title level={4} style={{ marginTop: '20px' }}>
        Procesando pago...
      </Title>
      <Text type="secondary">Conectando con el simulador de pagos</Text>
    </div>
  );

  const renderResult = () => (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <CheckCircleOutlined 
        style={{ fontSize: '48px', color: '#52c41a' }} 
      />
      <Title level={4} style={{ color: '#52c41a' }}>
        ¡Pago Simulado Exitoso!
      </Title>
      <Text>Redirigiendo...</Text>
    </div>
  );

  return (
    <Modal
      title="Pasarela de Pagos - Demo"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      centered
      maskClosable={false}
    >
      {step === 'form' && renderForm()}
      {step === 'processing' && renderProcessing()}
      {step === 'result' && renderResult()}
    </Modal>
  );
};
```

## Hook usePaymentSimulator.ts

```typescript
import { useState } from 'react';
import { message } from 'antd';

interface PaymentData {
  orderId: string;
  amount: number;
  paymentMethodId: string;
}

export const usePaymentSimulator = () => {
  const [loading, setLoading] = useState(false);

  const processPayment = async (paymentData: PaymentData): Promise<any> => {
    setLoading(true);
    
    try {
      // Primero crear la orden
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(paymentData)
      });

      if (!orderResponse.ok) {
        throw new Error('Error al crear la orden');
      }

      const orderResult = await orderResponse.json();
      
      return {
        success: true,
        data: orderResult.data
      };
    } catch (error) {
      message.error('Error al procesar el pago');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    processPayment,
    loading
  };
};
```

## Integración en Checkout.tsx

```typescript
import React, { useState } from 'react';
import { PaymentSimulator } from '../components/PaymentSimulator';
import { usePaymentSimulator } from '../hooks/usePaymentSimulator';

export const Checkout: React.FC = () => {
  const [showPaymentSimulator, setShowPaymentSimulator] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const { processPayment, loading } = usePaymentSimulator();

  const handlePaymentClick = async () => {
    // Crear orden primero
    const orderData = {
      orderId: `TH-${Date.now()}`,
      amount: getTotalAmount(),
      paymentMethodId: selectedPaymentMethod.id
    };

    const result = await processPayment(orderData);
    
    if (result.success) {
      setCurrentOrder(result.data);
      setShowPaymentSimulator(true);
    }
  };

  const handlePaymentSuccess = (result: any) => {
    setShowPaymentSimulator(false);
    message.success('¡Pago completado exitosamente!');
    
    // Redirigir a confirmación con los tickets
    navigate('/confirmation', { 
      state: { 
        orderId: result.orderId,
        tickets: result.tickets 
      }
    });
  };

  const handlePaymentError = (error: string) => {
    setShowPaymentSimulator(false);
    message.error(error);
  };

  return (
    <div>
      {/* Tu checkout form aquí */}
      
      <PaymentSimulator
        visible={showPaymentSimulator}
        orderId={currentOrder?.orderId || ''}
        amount={currentOrder?.totalAmount || 0}
        paymentMethod={{
          type: selectedPaymentMethod?.type || '',
          lastFour: selectedPaymentMethod?.lastFour || '',
          cardType: selectedPaymentMethod?.cardType || ''
        }}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        onCancel={() => setShowPaymentSimulator(false)}
      />
    </div>
  );
};
```

## Variables de Entorno para Demo

```env
# .env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_PAYMENT_MODE=demo
REACT_APP_DEMO_PAYMENT_DELAY=2000
```

## Mejoras para la Presentación

### 1. Datos Demo Predefinidos
```typescript
// Tarjetas demo predefinidas
export const DEMO_CARDS = [
  {
    type: 'demo-card',
    cardType: 'Visa Demo',
    lastFour: '4567',
    cardholder: 'Juan Pérez',
    expiry: '12/27',
    successRate: 95 // 95% de éxito
  },
  {
    type: 'demo-card',
    cardType: 'Mastercard Demo',
    lastFour: '1234',
    cardholder: 'Ana García',
    expiry: '06/26',
    successRate: 80 // 80% de éxito para mostrar fallos
  }
];
```

### 2. Estadísticas de Demo
```typescript
// Para mostrar en el dashboard de empresas
export const DEMO_STATS = {
  totalSales: 15750.00,
  totalTickets: 125,
  successfulPayments: 118,
  failedPayments: 7,
  conversionRate: 94.4
};
```

### 3. Notificaciones de Demo
```typescript
// Mostrar mensajes específicos para demo
export const showDemoNotification = () => {
  notification.info({
    message: 'Modo Demostración',
    description: 'Este es un pago simulado para efectos de presentación',
    icon: <ExperimentOutlined style={{ color: '#1890ff' }} />,
    duration: 3
  });
};
```

---

**Ventajas del Sistema Simulado:**

✅ **Sin configuración compleja** de pasarelas reales  
✅ **Control total** sobre resultados de pagos  
✅ **Perfecto para demos** y presentaciones  
✅ **No requiere datos bancarios** reales  
✅ **Rápido de implementar** y probar  
✅ **Permite mostrar** tanto éxitos como fallos  

**Para la presentación podrás:**
- Mostrar compras exitosas
- Simular pagos fallidos
- Demostrar el flujo completo
- Sin riesgos de seguridad
- Sin costos de transacción
