# Store App

Aplicación orientada a clientes finales.

## Funcionalidades objetivo

- Registro e inicio de sesión
- Catálogo de productos y servicios
- Carrito de compras
- Checkout
- Guardado de método de pago tokenizado
- Historial de órdenes

## Login cliente (frontend actual)

Se implementa una pantalla simple en `apps/store-app/frontend/index.html` que consume:

- `POST http://localhost:4000/api/client/login`

### Ejecutar frontend local

Puedes abrir `index.html` con cualquier servidor estático.

Ejemplo con Python:

```bash
cd apps/store-app/frontend
python3 -m http.server 4173
```

Luego abrir `http://localhost:4173`.

## Rutas sugeridas (futuro)

- `/` Home
- `/catalogo` Listado
- `/producto/[slug]` Detalle producto/servicio
- `/carrito`
- `/checkout`
- `/mi-cuenta`
- `/mis-ordenes`
