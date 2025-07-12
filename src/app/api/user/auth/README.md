# User Authentication API

## Endpoint

`GET /api/user/auth`

## Description

This endpoint checks the authentication status of the user by decoding the JWT token stored in the `token` cookie. It returns the decoded user information if the token is valid.

## Request

- Method: `GET`
- Cookies:
  - `token` (string): A JWT token representing the authenticated user.

## Responses

- **200 OK**

  Returns the decoded user information from the JWT token.

  ```json
  {
    "user": {
      "sub": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "iat": 1234567890,
      "exp": 1234567890
    }
  }
  ```

- **401 Unauthorized**

  - When the `token` cookie is missing:

    ```json
    {
      "user": null
    }
    ```

  - When the token is invalid or cannot be decoded:

    ```json
    {
      "error": "Invalid token"
    }
    ```

## Notes

- The JWT token should be set as a cookie named `token`.
- This endpoint does not require a request body.
- Use this endpoint to verify if the user is currently authenticated and to retrieve their user information.
