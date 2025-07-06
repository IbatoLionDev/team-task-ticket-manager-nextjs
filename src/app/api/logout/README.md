# Logout API Documentation

This is a RESTful API endpoint for logging out a user by expiring the authentication token cookie.

## Base URL

`/api/logout`

## Endpoint

### POST /api/logout

Logs out the user by expiring the authentication token cookie.

- **Response:**
  - **200 OK**
    - JSON object containing:
      - `message`: "Logout successful"
  - Sets the `token` cookie with `Max-Age=0` to expire it, effectively logging out the user.
