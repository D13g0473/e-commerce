# Arquitectura propuesta

## 1) Apps

### A. Store App (clientes)
Canales sugeridos:
- Web responsive (prioridad)
- Escalable a app móvil en fase 2

Módulos:
1. **Autenticación**
   - Sign in / login
   - Recuperación de contraseña
2. **Catálogo unificado**
   - Productos físicos y servicios en una misma búsqueda
   - Filtros por categoría, precio y disponibilidad
3. **Detalle de ítem**
   - Fotos, descripción, precio, descuentos
   - Para servicios: cobertura, agenda/disponibilidad, condiciones
4. **Carrito**
   - Agregar/eliminar ítems
   - Cantidades para productos
   - Parámetros de reserva para servicios (fecha/hora)
5. **Checkout**
   - Dirección o punto de prestación
   - Método de pago
   - Confirmación y creación de orden
6. **Pago y tarjetas guardadas**
   - Tokenización de tarjeta (nunca guardar PAN completo)
   - Reutilización segura en compras futuras
7. **Historial de órdenes**
   - Estado de compra
   - Facturación/resumen

### B. Admin App (gestión)
Módulos:
1. **Gestión de usuarios**
   - Alta/baja/edición
   - Roles (admin, operador, soporte)
2. **Gestión de catálogo**
   - Crear/editar productos y servicios
   - Variantes, stock, disponibilidad
3. **Precios y descuentos**
   - Precio base
   - Descuentos porcentuales/fijos
   - Reglas por vigencia
4. **Gestión de imágenes/media**
   - Carga de fotos
   - Orden/portada por ítem
5. **Órdenes y seguimiento**
   - Cambio de estado
   - Visibilidad operativa

---

## 2) Servicios backend sugeridos

Aunque hay 2 apps de frontend, conviene una capa backend modular:

- **Auth Service**: login, registro, JWT, refresh tokens, roles
- **Catalog Service**: productos/servicios, categorías, fotos
- **Pricing Service**: precios, descuentos, vigencias
- **Cart Service**: carrito por usuario/sesión
- **Order Service**: checkout y órdenes
- **Payment Service (integración PSP)**: tokenización y cobros
- **User Service**: perfiles y administración de usuarios

> Recomendación inicial: monolito modular (rápido de construir) con separación por dominios, y evolucionar a microservicios si crece el tráfico.

---

## 3) Seguridad y cumplimiento

1. **Tarjetas**
   - No almacenar datos sensibles de tarjeta en base propia.
   - Usar proveedor de pagos con tokenización (ej. Stripe, Adyen, Mercado Pago).
2. **Control de acceso**
   - RBAC por roles para Admin App.
3. **Protecciones base**
   - Hash de contraseñas (Argon2/Bcrypt)
   - Rotación de tokens
   - Rate limit en auth
   - Logs auditables en acciones administrativas
4. **Privacidad**
   - Minimizar datos personales
   - Trazabilidad de consentimiento y políticas

---

## 4) Stack recomendado

- **Frontend**: Next.js + TypeScript + Tailwind
- **Backend**: NestJS o Express + TypeScript
- **DB**: PostgreSQL
- **Cache**: Redis (carrito, sesiones, rate limits)
- **Archivos**: S3 compatible (AWS S3 / MinIO)
- **Mensajería (futuro)**: RabbitMQ/Kafka para eventos de órdenes
- **Infra**: Docker Compose (dev), CI/CD en GitHub Actions

---

## 5) Flujos críticos

1. **Registro/Login**
   - Usuario crea cuenta -> verifica email (opcional fase 2) -> obtiene sesión.
2. **Compra producto físico**
   - Catálogo -> carrito -> checkout -> pago -> orden -> estado “pagada”.
3. **Compra servicio**
   - Catálogo servicios -> selección de fecha/franja -> checkout -> pago -> orden de servicio.
4. **Gestión admin**
   - Admin crea ítem -> sube fotos -> define precio/descuento -> publica.
