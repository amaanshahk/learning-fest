# Northstar Data Pipeline

## D1 — Data Ingestion
Northstar receives inventory updates from warehouse operators through the API Gateway. Each update contains a product identifier, warehouse identifier, quantity, and event timestamp. The Inventory Service processes these updates.

## D2 — Input Validation
Before storing an inventory update, the Inventory Service checks whether the product and warehouse identifiers exist. Quantity values must be non-negative integers. Updates with invalid identifiers or negative quantities are rejected and recorded in the validation log.

## D3 — Database Persistence
Validated inventory updates are written to PostgreSQL. Each transaction updates the available stock quantity and records the event timestamp. Database transactions ensure that partial updates are not committed when an operation fails.

## D4 — Redis Cache
Frequently requested product information is cached in Redis. When inventory changes successfully in PostgreSQL, the corresponding cached product entry is invalidated. The next read request retrieves fresh information from PostgreSQL and repopulates the cache.

## D5 — Duplicate Update Prevention
Every inventory update includes a unique event identifier. The Inventory Service stores processed event identifiers to prevent duplicate updates. If an event identifier has already been processed, the update is ignored.

## D6 — Failed Updates
If PostgreSQL is unavailable, the Inventory Service does not report the inventory update as successful. The failed operation is logged for investigation. The warehouse operator must retry the update after database connectivity is restored.

## D7 — Data Consistency
PostgreSQL is the authoritative source for inventory quantities. Redis is only a performance optimization and must never be treated as the permanent source of stock information.
