# Admin App

Aplicación de gestión operativa.

## Funcionalidades objetivo

- Gestión de usuarios y roles
- Gestión de catálogo (productos/servicios)
- Gestión de precios y descuentos
- Gestión de fotos e imágenes
- Gestión de órdenes
- Login administrativo (implementado en backend)

## Backend de autenticación (actual)

Ubicación: `apps/admin-app/backend`

### Endpoints disponibles

- `POST /api/admin/login`
- `POST /api/client/login`
- `GET /health`

### Credenciales demo

- Admin: `admin@tienda.com` / `Admin123*`
- Cliente: `cliente@tienda.com` / `Cliente123*`

### Ejecutar

```bash
cd apps/admin-app/backend
npm install
npm start
```
