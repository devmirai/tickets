# 🗄️ Scripts SQL - Sistema de Tickets

## Creación de Base de Datos

```sql
-- Crear base de datos
CREATE DATABASE tickets_system 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE tickets_system;
```

## Creación de Tablas

### 1. Tabla users
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('customer', 'company') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(255),
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_user_type (user_type)
);
```

### 2. Tabla user_sessions
```sql
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    device_info TEXT,
    ip_address VARCHAR(45),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token_hash (token_hash),
    INDEX idx_user_expires (user_id, expires_at)
);
```

### 3. Tabla events
```sql
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL,
    venue VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    category VARCHAR(100),
    image_url VARCHAR(500),
    total_tickets INT NOT NULL,
    available_tickets INT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_company_date (company_id, event_date),
    INDEX idx_city_date (city, event_date),
    INDEX idx_category (category)
);
```

### 4. Tabla ticket_types
```sql
CREATE TABLE ticket_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity_available INT NOT NULL,
    quantity_sold INT DEFAULT 0,
    benefits TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    INDEX idx_event_type (event_id, name)
);
```

### 5. Tabla orders
```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_id VARCHAR(255),
    billing_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_status (user_id, status),
    INDEX idx_order_number (order_number)
);
```

### 6. Tabla order_items
```sql
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    event_id INT NOT NULL,
    ticket_type_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id) ON DELETE CASCADE
);
```

### 7. Tabla tickets
```sql
CREATE TABLE tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    event_id INT NOT NULL,
    ticket_type_id INT NOT NULL,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    qr_code VARCHAR(255) UNIQUE NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_location VARCHAR(255) NOT NULL,
    event_date DATETIME NOT NULL,
    holder_name VARCHAR(255),
    holder_email VARCHAR(255),
    seat_number VARCHAR(20),
    section VARCHAR(50),
    status ENUM('valid', 'used', 'cancelled') DEFAULT 'valid',
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id) ON DELETE CASCADE,
    INDEX idx_order_status (order_id, status),
    INDEX idx_qr_code (qr_code),
    INDEX idx_ticket_number (ticket_number)
);
```

### 8. Tabla payment_methods (Simulado para Demo)
```sql
CREATE TABLE payment_methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('credit-card', 'paypal', 'apple-pay', 'demo-card') NOT NULL,
    provider VARCHAR(50),
    card_type VARCHAR(50),
    last_four_digits VARCHAR(4),
    cardholder_name VARCHAR(255),
    expiry_month INT,
    expiry_year INT,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    -- Campo para simulación
    is_demo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_default (user_id, is_default)
);
```

### 9. Tabla ticket_validations
```sql
CREATE TABLE ticket_validations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ticket_id INT NOT NULL,
    validated_by INT,
    validation_method ENUM('qr_scan', 'manual', 'app') NOT NULL,
    location VARCHAR(255),
    validated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (validated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_ticket_date (ticket_id, validated_at)
);
```

## Datos de Prueba

### Insertar usuarios de ejemplo
```sql
INSERT INTO users (email, password_hash, user_type, first_name, last_name, company_name) VALUES
('user@tickethub.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LyYwP0yLJ5X8Q1Z8.', 'customer', 'Juan', 'Pérez', NULL),
('empresa@tickethub.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LyYwP0yLJ5X8Q1Z8.', 'company', 'María', 'García', 'Eventos Elite SA');
```

### Insertar eventos de ejemplo
```sql
INSERT INTO events (company_id, title, description, event_date, venue, address, city, category, total_tickets, available_tickets, base_price) VALUES
(2, 'Concierto de Rock 2025', 'Gran concierto de rock con las mejores bandas', '2025-08-12 20:00:00', 'Estadio Nacional', 'Av. Principal 123', 'Ciudad Capital', 'Música', 5000, 4998, 150.00),
(2, 'Festival de Jazz', 'Festival anual de jazz con artistas internacionales', '2025-09-05 19:00:00', 'Auditorio de la Ciudad', 'Calle Central 456', 'Ciudad Capital', 'Música', 2000, 1999, 90.00);
```

### Insertar tipos de tickets
```sql
INSERT INTO ticket_types (event_id, name, description, price, quantity_available, quantity_sold) VALUES
(1, 'General', 'Acceso general al evento', 150.00, 4000, 2),
(1, 'VIP', 'Acceso VIP con beneficios especiales', 300.00, 1000, 0),
(2, 'General', 'Acceso general al festival', 90.00, 1800, 1),
(2, 'Premium', 'Acceso premium con asientos preferenciales', 180.00, 200, 0);
```

### Insertar orden de ejemplo
```sql
INSERT INTO orders (user_id, order_number, total_amount, status, payment_method) VALUES
(1, 'TH-2025-001', 300.00, 'completed', 'credit-card');
```

### Insertar items de orden
```sql
INSERT INTO order_items (order_id, event_id, ticket_type_id, quantity, unit_price, total_price) VALUES
(1, 1, 1, 2, 150.00, 300.00);
```

### Insertar tickets
```sql
INSERT INTO tickets (order_id, event_id, ticket_type_id, ticket_number, qr_code, event_name, event_location, event_date, holder_name, holder_email, status) VALUES
(1, 1, 1, 'TK-001-001', 'QR-TK-001-001-HASH', 'Concierto de Rock 2025', 'Estadio Nacional', '2025-08-12 20:00:00', 'Juan Pérez', 'user@tickethub.com', 'valid'),
(1, 1, 1, 'TK-001-002', 'QR-TK-001-002-HASH', 'Concierto de Rock 2025', 'Estadio Nacional', '2025-08-12 20:00:00', 'Juan Pérez', 'user@tickethub.com', 'valid');
```

### Insertar métodos de pago (Demo)
```sql
INSERT INTO payment_methods (user_id, type, card_type, last_four_digits, cardholder_name, expiry_month, expiry_year, is_default, is_demo) VALUES
(1, 'demo-card', 'Visa Demo', '4567', 'Juan Pérez', 12, 2027, TRUE, TRUE),
(1, 'demo-card', 'Mastercard Demo', '1234', 'Juan Pérez', 6, 2026, FALSE, TRUE);
```

## Consultas Útiles

### Obtener tickets de un usuario
```sql
SELECT 
    t.id,
    o.order_number as orderId,
    t.event_name as eventName,
    DATE_FORMAT(t.event_date, '%Y-%m-%d') as eventDate,
    t.event_location as eventLocation,
    oi.quantity,
    oi.total_price as totalPrice,
    DATE_FORMAT(o.created_at, '%Y-%m-%dT%H:%i:%sZ') as purchaseDate,
    t.status,
    t.ticket_number as ticketNumber
FROM tickets t
JOIN orders o ON t.order_id = o.id
JOIN order_items oi ON o.id = oi.order_id AND t.event_id = oi.event_id
WHERE o.user_id = ? AND o.status = 'completed'
ORDER BY o.created_at DESC;
```

### Obtener eventos de una empresa
```sql
SELECT 
    e.id,
    e.title,
    e.description,
    DATE_FORMAT(e.event_date, '%Y-%m-%d %H:%i') as eventDate,
    e.venue,
    e.city,
    e.category,
    e.total_tickets,
    e.available_tickets,
    e.base_price,
    e.is_active
FROM events e
WHERE e.company_id = ? AND e.is_active = TRUE
ORDER BY e.event_date ASC;
```

### Obtener compradores de eventos de una empresa
```sql
SELECT 
    o.id,
    CONCAT(u.first_name, ' ', u.last_name) as customerName,
    u.email,
    u.phone,
    SUM(oi.quantity) as quantity,
    o.total_amount as totalPaid,
    DATE_FORMAT(o.created_at, '%Y-%m-%dT%H:%i:%sZ') as purchaseDate,
    o.order_number as orderId
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN events e ON oi.event_id = e.id
WHERE e.company_id = ? AND o.status = 'completed'
GROUP BY o.id, u.id
ORDER BY o.created_at DESC;
```

### Validar ticket por QR
```sql
SELECT 
    t.id,
    t.ticket_number,
    t.event_name,
    t.event_location,
    t.event_date,
    t.status,
    t.holder_name,
    tt.name as ticket_type,
    e.title as event_title
FROM tickets t
JOIN ticket_types tt ON t.ticket_type_id = tt.id
JOIN events e ON t.event_id = e.id
WHERE t.qr_code = ? AND t.status = 'valid';
```

### Actualizar tickets disponibles después de compra
```sql
UPDATE events 
SET available_tickets = available_tickets - ?
WHERE id = ? AND available_tickets >= ?;

UPDATE ticket_types 
SET quantity_sold = quantity_sold + ?
WHERE id = ? AND (quantity_available - quantity_sold) >= ?;
```

## Triggers Útiles

### Trigger para actualizar available_tickets automáticamente
```sql
DELIMITER //

CREATE TRIGGER update_available_tickets_after_order
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE events 
    SET available_tickets = available_tickets - NEW.quantity
    WHERE id = NEW.event_id;
    
    UPDATE ticket_types 
    SET quantity_sold = quantity_sold + NEW.quantity
    WHERE id = NEW.ticket_type_id;
END//

DELIMITER ;
```

### Trigger para generar ticket_number automáticamente
```sql
DELIMITER //

CREATE TRIGGER generate_ticket_number
BEFORE INSERT ON tickets
FOR EACH ROW
BEGIN
    DECLARE ticket_count INT;
    
    SELECT COUNT(*) + 1 INTO ticket_count
    FROM tickets
    WHERE event_id = NEW.event_id;
    
    SET NEW.ticket_number = CONCAT('TK-', LPAD(NEW.event_id, 3, '0'), '-', LPAD(ticket_count, 3, '0'));
    SET NEW.qr_code = CONCAT('QR-', NEW.ticket_number, '-', SHA2(CONCAT(NEW.event_id, NOW(), RAND()), 256));
END//

DELIMITER ;
```

---

**Fecha**: Julio 2025  
**Proyecto**: Sistema de Tickets  
**Versión DB**: 1.0
