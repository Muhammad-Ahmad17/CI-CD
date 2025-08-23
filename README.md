# Node.js Server with Local DynamoDB and Tests

## Prerequisites
- Node.js (v16 or higher)
- Docker (for running local DynamoDB)

## Setup
1. Install dependencies: `npm install`
2. Start local DynamoDB:
   - Run `npm run dynamodb` to start DynamoDB in Docker
   - Ensure port 8000 is available
3. Run the server: `npm start`
4. Run tests: `npm test`

## Endpoints
- `GET /api/v1/hello`: Returns a hello message
- `POST /api/v1/users`: Creates a new user (requires `name` and `email`)
- `GET /api/v1/users`: Lists all users

## Database
- Uses local DynamoDB running on `http://localhost:8000`
- Stores users in a `Users` table with `id` (partition key), `name`, and `email`

## Testing
- Uses Jest and Supertest for API testing
- Tests cover basic CRUD operations and error cases

## Notes
- Ensure Docker is running before starting the local DynamoDB instance.
- The `Users` table is created automatically on server startup.
- Tests clean up the table after completion.