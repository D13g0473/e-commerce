# Modelo de datos (base)

## Entidades principales

## 1. users
- id (uuid)
- email (unique)
- password_hash
- full_name
- phone
- status (active/inactive)
- created_at
- updated_at

## 2. roles
- id
- name (admin/operator/support/customer)

## 3. user_roles
- user_id
- role_id

## 4. categories
- id
- name
- type (product/service/mixed)

## 5. items
Tabla unificada para vender productos y servicios.

- id (uuid)
- item_type (product/service)
- title
- slug
- description
- category_id
- is_active
- created_at
- updated_at

## 6. product_details
(usar solo cuando item_type=product)
- item_id
- sku
- stock
- weight
- dimensions_json

## 7. service_details
(usar solo cuando item_type=service)
- item_id
- service_mode (onsite/remote)
- coverage_area
- duration_minutes
- availability_rules_json

## 8. item_images
- id
- item_id
- url
- is_primary
- sort_order

## 9. prices
- id
- item_id
- currency
- amount
- valid_from
- valid_to

## 10. discounts
- id
- item_id
- discount_type (percent/fixed)
- discount_value
- starts_at
- ends_at
- is_active

## 11. carts
- id
- user_id
- status (active/ordered/abandoned)
- created_at
- updated_at

## 12. cart_items
- id
- cart_id
- item_id
- quantity
- unit_price_snapshot
- service_slot_json (fecha/hora si aplica)

## 13. orders
- id
- user_id
- cart_id
- total_amount
- currency
- order_status (pending/paid/cancelled/completed)
- payment_status
- created_at

## 14. order_items
- id
- order_id
- item_id
- quantity
- unit_price
- discount_applied
- line_total

## 15. payment_methods
- id
- user_id
- provider
- token_reference
- brand
- last4
- exp_month
- exp_year
- is_default

## 16. payments
- id
- order_id
- provider
- provider_payment_id
- amount
- status
- paid_at

---

## Notas de diseño

- Se usa `items` unificado para soportar productos y servicios con una sola lógica de catálogo y búsqueda.
- Los detalles específicos se separan en `product_details` y `service_details`.
- Para pagos, se guarda **token de proveedor** y metadata no sensible.
- `unit_price_snapshot` y `unit_price` en carrito/orden evitan inconsistencias por cambios de precio futuros.
