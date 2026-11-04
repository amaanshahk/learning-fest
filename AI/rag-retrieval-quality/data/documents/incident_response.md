# Northstar Incident Response and Recovery

## R1 — PostgreSQL Outage
When PostgreSQL becomes unavailable, inventory updates cannot be committed. The Inventory Service must reject these operations rather than acknowledge successful updates. Failed operations are logged, and warehouse operators retry them after database connectivity is restored.

## R2 — Redis Outage
If Redis becomes unavailable, the Inventory Service can retrieve product information directly from PostgreSQL. The application may experience increased database load and slower response times, but PostgreSQL remains the authoritative data source.

## R3 — Message Broker Failure
If the message broker becomes unavailable after an order is confirmed, the OrderCreated event cannot be delivered immediately. The order confirmation itself remains successful. The event must be retained for retry so that the Notification Service can eventually process it.

## R4 — Notification Service Failure
If the Notification Service is unavailable, customers may not immediately receive order confirmation emails. Order processing remains independent of notification delivery. Pending notification events are processed when the service becomes available again.

## R5 — Duplicate Event Handling
The Inventory Service uses unique event identifiers to prevent duplicate inventory updates. This ensures that retrying a previously processed warehouse event does not incorrectly increase or decrease stock quantities.

## R6 — Recovery Priorities
During a major incident, restoring PostgreSQL connectivity takes priority over restoring Redis because PostgreSQL stores authoritative inventory information. Redis can be repopulated from PostgreSQL after service recovery.

## R7 — Monitoring
Northstar monitors API response times, database connectivity, Redis availability, message broker delivery failures, and backend service health. Alerts are generated when service metrics exceed predefined operational thresholds.

## R8 — Order and Notification Consistency
An order can be successfully confirmed even if its notification email is delayed. Recovery procedures must ensure that pending OrderCreated events are eventually delivered without creating duplicate orders or duplicate notifications.
