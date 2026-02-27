# E-commerce Monorepo

Diseño inicial de una plataforma con **2 aplicaciones**:

1. **Store App**: experiencia de compra para clientes finales (productos físicos y servicios).
2. **Admin App**: gestión de catálogo, usuarios, precios, descuentos y activos multimedia.

## Objetivo

Permitir vender en una misma tienda:
- Productos físicos (celulares, laptops, etc.)
- Servicios (niñera, contaduría, transporte)

Con funcionalidades clave:
- Registro e inicio de sesión
- Carrito de compras
- Checkout
- Guardado seguro de tarjeta para compras futuras
- Panel administrativo para operación diaria

## Estructura del repositorio

```text
.
├── apps/
│   ├── store-app/      # App cliente (tienda)
│   └── admin-app/      # App de gestión
└── docs/
    ├── arquitectura.md
    ├── modelo-datos.md
    └── roadmap.md
```

## Alcance de esta entrega

Esta primera versión deja el **diseño funcional y técnico** listo para comenzar implementación por fases.

- Arquitectura de alto nivel
- Módulos por app
- Modelo de datos base
- Flujos críticos (auth, carrito, compra, administración)
- Roadmap por iteraciones

Revisar:
- [`docs/arquitectura.md`](docs/arquitectura.md)
- [`docs/modelo-datos.md`](docs/modelo-datos.md)
- [`docs/roadmap.md`](docs/roadmap.md)


## Progreso actual

- ✅ API inicial de login en `apps/admin-app/backend` para admin y cliente.
- ✅ Pantalla de login cliente en `apps/store-app/frontend` conectada al endpoint de cliente.
=======

