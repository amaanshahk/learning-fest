# Northstar Authentication and Security

## S1 — User Authentication
Northstar authenticates users through the Authentication Service. Users submit their registered email address and password. Credentials are verified against securely stored password hashes.

## S2 — Access Tokens
After successful authentication, the Authentication Service issues a short-lived access token. The token contains the user's identifier, assigned role, and expiration timestamp. Clients include this token in the Authorization header of protected API requests.

## S3 — Refresh Tokens
Northstar also issues refresh tokens with a longer validity period. When an access token expires, the client can submit its refresh token to obtain a new access token without requiring the user to enter credentials again.

## S4 — Token Validation
The API Gateway validates access tokens before forwarding protected requests. It checks the token signature, expiration timestamp, and required claims. Requests containing invalid or expired access tokens are rejected with an unauthorized response.

## S5 — Role-Based Access Control
Northstar uses role-based access control. Administrators can manage users and warehouse configurations. Warehouse operators can update inventory quantities. Customers can view products and place orders but cannot directly modify warehouse stock.

## S6 — Refresh Token Revocation
When a user logs out, the Authentication Service revokes the associated refresh token. A revoked refresh token cannot be used to generate new access tokens. Existing access tokens remain valid until they expire unless an additional token-revocation mechanism is implemented.

## S7 — Password Security
Passwords are never stored as plain text. The Authentication Service stores salted password hashes using a secure password hashing algorithm. Password verification compares the submitted password against the stored hash.
