# Login API Documentation

This is a RESTful API endpoint for user authentication. It allows users to log in using their email or username along with their password.

## Base URL

`/api/login`

## Endpoint

### POST /api/login

Authenticate a user.

- **Request Body (JSON):**
  - `identifier` (string, required) - Email or username of the user
  - `password` (string, required) - User's password

- **Response:**
  - **200 OK**
    - JSON object containing:
      - `message`: "Login successful"
      - `userId`: User's unique ID
      - `username`: User's username
      - `email`: User's email
  - **400 Bad Request**
    - JSON object with error message: "Missing identifier or password"
  - **401 Unauthorized**
    - JSON object with error message: "User not found" or "Incorrect password"
  - **500 Internal Server Error**
    - JSON object with error message: "Login failed due to server error"

## Error Handling

All error responses return a JSON object with an `error` field describing the issue, along with an appropriate HTTP status code.
