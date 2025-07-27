# API User by ID Endpoint

This endpoint provides access to detailed information of a specific user identified by their ID.

## Available Method

### GET

- Retrieves a user by their ID.
- Supports field selection via query parameters. For example, `?firstName=true&email=true` will return only those fields.
- Returns user information including task relations:
  - `assignedTasks`: Tasks assigned to the user.
  - `completedTasks`: Tasks completed by the user.
  - `completedSubtasks`: Subtasks completed by the user.

## Managed Fields

- `id` (Int): Unique identifier of the user.
- `firstName` (String): User's first name.
- `username` (String): Unique username.
- `lastName` (String): User's last name.
- `email` (String): Unique email address.
- `phoneNumber` (String, optional): User's phone number.
- `createdAt` (DateTime): Timestamp of user creation.
- `updatedAt` (DateTime): Timestamp of last update.
- Relations:
  - `assignedTasks` (Task[]): Tasks assigned to the user.
  - `completedTasks` (Task[]): Tasks completed by the user.
  - `completedSubtasks` (Subtask[]): Subtasks completed by the user.

## Error Handling

- Returns appropriate HTTP status codes and error messages for:
  - Invalid user ID.
  - User not found.
  - Server errors during the query.

## Notes

- This endpoint is adapted to the Prisma schema defined in `prisma/schema.prisma`.
- Task relations are eagerly loaded to provide comprehensive user information.
- Client applications should handle nested task data appropriately.

## Example Request

```
GET /api/user/1?firstName=true&email=true
```

Returns the user with ID 1, showing only the `firstName` and `email` fields along with task relations.
