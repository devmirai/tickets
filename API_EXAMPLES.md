# 🚀 Ejemplos de Implementación API - Sistema de Tickets

## Estructura de Respuestas Estándar

### Respuesta Exitosa
```json
{
  "success": true,
  "data": {}, 
  "message": "Operación completada exitosamente"
}
```

### Respuesta de Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos proporcionados no son válidos",
    "details": {
      "email": "El email es requerido",
      "password": "La contraseña debe tener al menos 8 caracteres"
    }
  }
}
```

---

## 🔐 Autenticación

### POST /api/auth/register
```javascript
// Request Body
{
  "email": "usuario@email.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez", 
  "phone": "+1234567890",
  "userType": "customer", // o "company"
  "companyName": "Mi Empresa SA" // solo si userType === "company"
}

// Response 201
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "usuario@email.com",
      "firstName": "Juan", 
      "lastName": "Pérez",
      "userType": "customer",
      "createdAt": "2025-07-23T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Usuario registrado exitosamente"
}
```

### POST /api/auth/login
```javascript
// Request Body
{
  "email": "usuario@email.com",
  "password": "password123"
}

// Response 200
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "usuario@email.com",
      "firstName": "Juan",
      "lastName": "Pérez", 
      "userType": "customer",
      "companyName": null,
      "createdAt": "2025-07-23T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### GET /api/auth/me
```javascript
// Headers: Authorization: Bearer {token}

// Response 200
{
  "success": true,
  "data": {
    "id": "1",
    "email": "usuario@email.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "phone": "+1234567890",
    "userType": "customer",
    "companyName": null,
    "createdAt": "2025-07-23T10:30:00Z"
  }
}
```

---

## 🎫 Gestión de Tickets

### GET /api/users/tickets
```javascript
// Headers: Authorization: Bearer {token}

// Response 200
{
  "success": true,
  "data": [
    {
      "id": "1",
      "orderId": "TH-2025-001",
      "eventName": "Concierto de Rock 2025",
      "eventDate": "2025-08-12",
      "eventLocation": "Estadio Nacional",
      "quantity": 2,
      "totalPrice": 300.00,
      "purchaseDate": "2025-07-20T10:30:00Z",
      "status": "valid",
      "ticketNumber": "TK-001-001"
    },
    {
      "id": "2", 
      "orderId": "TH-2025-002",
      "eventName": "Festival de Jazz",
      "eventDate": "2025-09-05",
      "eventLocation": "Auditorio de la Ciudad",
      "quantity": 1,
      "totalPrice": 90.00,
      "purchaseDate": "2025-07-18T15:45:00Z",
      "status": "valid",
      "ticketNumber": "TK-002-001"
    }
  ]
}
```

### GET /api/tickets/:id
```javascript
// Headers: Authorization: Bearer {token}

// Response 200
{
  "success": true,
  "data": {
    "id": "1",
    "ticketNumber": "TK-001-001",
    "qrCode": "QR-TK-001-001-HASH",
    "eventName": "Concierto de Rock 2025",
    "eventDate": "2025-08-12T20:00:00Z",
    "eventLocation": "Estadio Nacional", 
    "holderName": "Juan Pérez",
    "holderEmail": "usuario@email.com",
    "seatNumber": "A-15",
    "section": "General",
    "status": "valid",
    "ticketType": "General",
    "price": 150.00,
    "orderId": "TH-2025-001",
    "purchaseDate": "2025-07-20T10:30:00Z"
  }
}
```

### GET /api/tickets/:id/qr
```javascript
// Headers: Authorization: Bearer {token}

// Response 200
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "qrText": "QR-TK-001-001-HASH",
    "ticketInfo": {
      "eventName": "Concierto de Rock 2025",
      "ticketNumber": "TK-001-001",
      "holderName": "Juan Pérez"
    }
  }
}
```

---

## 💳 Métodos de Pago

### GET /api/users/payment-methods
```javascript
// Headers: Authorization: Bearer {token}

// Response 200  
{
  "success": true,
  "data": [
    {
      "id": "1",
      "type": "demo-card",
      "lastFour": "4567",
      "cardType": "Visa Demo",
      "isDefault": true,
      "expiryDate": "12/27",
      "isDemo": true
    },
    {
      "id": "2",
      "type": "demo-card", 
      "lastFour": "1234",
      "cardType": "Mastercard Demo",
      "isDefault": false,
      "expiryDate": "06/26",
      "isDemo": true
    }
  ]
}
```

### POST /api/users/payment-methods
```javascript
// Headers: Authorization: Bearer {token}
// Request Body (Simulación de Tarjeta Demo)
{
  "type": "demo-card",
  "cardNumber": "4111111111111111", // Número demo - no se validará
  "expiryMonth": 12,
  "expiryYear": 2027,
  "cvv": "123", // No se guarda - solo para simulación
  "cardholderName": "Juan Pérez",
  "isDefault": false
}

// Response 201
{
  "success": true,
  "data": {
    "id": "3",
    "type": "demo-card",
    "lastFour": "1111", 
    "cardType": "Visa Demo",
    "isDefault": false,
    "expiryDate": "12/27",
    "isDemo": true
  },
  "message": "Método de pago demo agregado exitosamente"
}
```

---

## 🎪 Gestión de Eventos

### GET /api/events
```javascript
// Query Parameters: ?page=1&limit=20&city=Madrid&category=Música

// Response 200
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "1",
        "title": "Concierto de Rock 2025",
        "description": "Gran concierto de rock con las mejores bandas",
        "eventDate": "2025-08-12T20:00:00Z",
        "venue": "Estadio Nacional",
        "address": "Av. Principal 123",
        "city": "Ciudad Capital",
        "category": "Música",
        "imageUrl": "https://example.com/image.jpg",
        "totalTickets": 5000,
        "availableTickets": 4998,
        "basePrice": 150.00,
        "company": {
          "id": "2",
          "name": "Eventos Elite SA"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

### POST /api/events (Solo Empresas)
```javascript
// Headers: Authorization: Bearer {token}
// Request Body
{
  "title": "Festival de Verano 2025",
  "description": "El mejor festival del año",
  "eventDate": "2025-08-15T18:00:00Z",
  "venue": "Parque Central",
  "address": "Calle Festival 789",
  "city": "Ciudad Capital",
  "category": "Música",
  "totalTickets": 3000,
  "basePrice": 120.00,
  "ticketTypes": [
    {
      "name": "General",
      "description": "Acceso general",
      "price": 120.00,
      "quantity": 2500
    },
    {
      "name": "VIP", 
      "description": "Acceso VIP",
      "price": 250.00,
      "quantity": 500
    }
  ]
}

// Response 201
{
  "success": true,
  "data": {
    "id": "3",
    "title": "Festival de Verano 2025",
    "eventDate": "2025-08-15T18:00:00Z",
    "venue": "Parque Central",
    "totalTickets": 3000,
    "availableTickets": 3000,
    "basePrice": 120.00,
    "isActive": true,
    "createdAt": "2025-07-23T15:30:00Z"
  },
  "message": "Evento creado exitosamente"
}
```

### GET /api/company/customers (Solo Empresas)
```javascript
// Headers: Authorization: Bearer {token}

// Response 200
{
  "success": true,
  "data": [
    {
      "id": "1",
      "customerName": "Juan Pérez",
      "email": "usuario@email.com",
      "phone": "+1234567890",
      "quantity": 2,
      "totalPaid": 300.00,
      "purchaseDate": "2025-07-20T10:30:00Z",
      "orderId": "TH-2025-001"
    },
    {
      "id": "2",
      "customerName": "Ana Martínez", 
      "email": "ana@email.com",
      "phone": "+1122334455",
      "quantity": 1,
      "totalPaid": 150.00,
      "purchaseDate": "2025-07-21T14:20:00Z", 
      "orderId": "TH-2025-003"
    }
  ]
}
```

---

## 🛒 Sistema de Compras (Simulado)

### POST /api/orders
```javascript
// Headers: Authorization: Bearer {token}
// Request Body
{
  "items": [
    {
      "eventId": "1",
      "ticketTypeId": "1",
      "quantity": 2
    }
  ],
  "paymentMethodId": "1", // Método de pago demo
  "billingAddress": {
    "street": "Calle Principal 123",
    "city": "Ciudad Capital",
    "zipCode": "12345",
    "country": "País"
  }
}

// Response 201
{
  "success": true,
  "data": {
    "orderId": "TH-2025-005",
    "totalAmount": 300.00,
    "status": "pending",
    "items": [
      {
        "eventName": "Concierto de Rock 2025",
        "ticketType": "General",
        "quantity": 2,
        "unitPrice": 150.00,
        "totalPrice": 300.00
      }
    ]
  },
  "message": "Orden creada exitosamente"
}
```

### POST /api/payments/simulate
```javascript
// Headers: Authorization: Bearer {token}
// Request Body
{
  "orderId": "TH-2025-005",
  "paymentMethodId": "1",
  "amount": 300.00,
  "simulateSuccess": true // true = pago exitoso, false = pago fallido
}

// Response 200 - Pago Exitoso (Simulado)
{
  "success": true,
  "data": {
    "paymentId": "demo_payment_" + Date.now(),
    "status": "completed",
    "orderId": "TH-2025-005",
    "amount": 300.00,
    "simulationMessage": "Pago simulado exitosamente",
    "tickets": [
      {
        "id": "10",
        "ticketNumber": "TK-001-010",
        "qrCode": "QR-TK-001-010-HASH"
      },
      {
        "id": "11", 
        "ticketNumber": "TK-001-011",
        "qrCode": "QR-TK-001-011-HASH"
      }
    ]
  },
  "message": "Pago procesado exitosamente (DEMO)"
}

// Response 400 - Pago Fallido (Simulado)
{
  "success": false,
  "error": {
    "code": "DEMO_PAYMENT_FAILED",
    "message": "Pago rechazado por el simulador de pagos",
    "details": {
      "reason": "Fondos insuficientes (simulación)",
      "orderId": "TH-2025-005"
    }
  }
}
```

### GET /api/payments/demo-page
```javascript
// Retorna una página HTML simple para simular la pasarela de pago
// Esta página tendrá botones para "Aprobar Pago" y "Rechazar Pago"

// Response 200 (HTML)
<!DOCTYPE html>
<html>
<head>
    <title>Simulador de Pagos - TicketHub</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
        .payment-card { 
            max-width: 400px; margin: 0 auto; padding: 20px; 
            border: 1px solid #ddd; border-radius: 8px; 
        }
        button { 
            padding: 10px 20px; margin: 10px; border: none; 
            border-radius: 5px; cursor: pointer; 
        }
        .success { background-color: #28a745; color: white; }
        .danger { background-color: #dc3545; color: white; }
    </style>
</head>
<body>
    <div class="payment-card">
        <h2>🏦 Simulador de Pagos</h2>
        <p><strong>Orden:</strong> TH-2025-005</p>
        <p><strong>Monto:</strong> $300.00</p>
        <p><strong>Método:</strong> Visa Demo ****4567</p>
        
        <h3>Selecciona el resultado:</h3>
        <button class="success" onclick="approvePayment()">
            ✅ Aprobar Pago
        </button>
        <button class="danger" onclick="rejectPayment()">
            ❌ Rechazar Pago
        </button>
    </div>
    
    <script>
        function approvePayment() {
            // Redirigir de vuelta a la app con éxito
            window.parent.postMessage({
                type: 'PAYMENT_RESULT',
                success: true,
                orderId: 'TH-2025-005'
            }, '*');
        }
        
        function rejectPayment() {
            // Redirigir de vuelta a la app con error
            window.parent.postMessage({
                type: 'PAYMENT_RESULT',
                success: false,
                orderId: 'TH-2025-005',
                error: 'Pago rechazado por el usuario'
            }, '*');
        }
    </script>
</body>
</html>
```

---

## ⚡ Validación de Tickets

### POST /api/tickets/validate
```javascript
// Headers: Authorization: Bearer {token}
// Request Body
{
  "qrCode": "QR-TK-001-001-HASH"
}

// Response 200 - Ticket Válido
{
  "success": true,
  "data": {
    "isValid": true,
    "ticket": {
      "id": "1",
      "ticketNumber": "TK-001-001",
      "eventName": "Concierto de Rock 2025",
      "eventDate": "2025-08-12T20:00:00Z",
      "holderName": "Juan Pérez",
      "ticketType": "General",
      "seatNumber": "A-15",
      "status": "valid"
    },
    "validatedAt": "2025-08-12T19:45:00Z"
  },
  "message": "Ticket válido - Acceso autorizado"
}

// Response 400 - Ticket Ya Usado
{
  "success": false,
  "error": {
    "code": "TICKET_ALREADY_USED",
    "message": "Este ticket ya fue utilizado",
    "details": {
      "usedAt": "2025-08-12T19:30:00Z"
    }
  }
}

// Response 404 - Ticket No Encontrado
{
  "success": false,
  "error": {
    "code": "TICKET_NOT_FOUND", 
    "message": "El código QR no corresponde a ningún ticket válido"
  }
}
```

---

## 🔧 Middleware de Autenticación (Ejemplo Node.js)

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'Token de acceso requerido'
        }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Token de acceso inválido'
      }
    });
  }
};

// Middleware para validar tipo de usuario
const requireCompany = (req, res, next) => {
  if (req.user.userType !== 'company') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'INSUFFICIENT_PERMISSIONS',
        message: 'Esta acción requiere permisos de empresa'
      }
    });
  }
  next();
};
```

---

## 📊 Códigos de Error Estándar

| Código | HTTP | Descripción |
|--------|------|-------------|
| `VALIDATION_ERROR` | 400 | Datos de entrada inválidos |
| `UNAUTHORIZED` | 401 | Token faltante o inválido |
| `FORBIDDEN` | 403 | Permisos insuficientes |
| `NOT_FOUND` | 404 | Recurso no encontrado |
| `CONFLICT` | 409 | Recurso ya existe |
| `PAYMENT_FAILED` | 402 | Error en el procesamiento del pago |
| `TICKET_ALREADY_USED` | 400 | Ticket ya fue utilizado |
| `INSUFFICIENT_TICKETS` | 400 | No hay suficientes tickets disponibles |
| `EVENT_EXPIRED` | 400 | El evento ya finalizó |
| `INTERNAL_ERROR` | 500 | Error interno del servidor |

---

**Fecha**: Julio 2025  
**Proyecto**: Sistema de Tickets  
**Documentación**: Ejemplos de implementación API
