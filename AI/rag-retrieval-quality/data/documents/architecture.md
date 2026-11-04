# Northstar System Architecture

## A1 — System Overview
Northstar is a fictional inventory management platform designed for medium-sized retailers. It consists of an API Gateway, Authentication Service, Inventory Service, Order Service, and Notification Service. The system uses PostgreSQL for persistent storage and Redis for caching.

## A2 — API Gateway
The API Gateway is the single entry point for all external client requests. It validates incoming request formats, applies rate limits, and forwards requests to the appropriate backend service. It does not directly access the PostgreSQL database.

## A3 — Inventory Service
The Inventory Service manages product information, stock quantities, and warehouse locations. It communicates with PostgreSQL to persist inventory changes. Redis caches frequently accessed product information to reduce database load.

## A4 — Order Service
The Order Service processes customer orders. Before confirming an order, it requests available stock information from the Inventory Service. Once an order is confirmed, it publishes an OrderCreated event for other services to consume.

## A5 — Notification Service
The Notification Service consumes OrderCreated events and sends order confirmation messages to customers through email. It operates asynchronously and does not block the order confirmation process.

## A6 — Service Communication
Backend services communicate through synchronous REST APIs when an immediate response is required. Asynchronous operations use a message broker. This separation prevents slow background operations from unnecessarily delaying customer-facing requests.

## A7 — Availability Design
The API Gateway and backend services are designed to run as independent instances. If one instance becomes unavailable, incoming requests can be routed to healthy instances. Redis and PostgreSQL remain shared infrastructure dependencies.
