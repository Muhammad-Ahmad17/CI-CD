# Node.js Server with Local DynamoDB and Tests
 
## Prerequisites
- Node.js (v16 or higher)
- Docker (for running local DynamoDB)


1.

## Setup
0. clone the repo and delete .github folder .
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


2. push this to your own repo 

3.
 create .github/workflows/ci.yml 
 push code to repo again with some code changing like add new api in user and also write its test 
 this will check your ci is working accuratly 

4.
now we writte cd 
-- prereqs :
      1 create iam user with acess to s3 and elasticbestalk
      2 from root user go to user which you created 
      3 security-credentials -> acess-key -> select aws-cli and generate that key and save 
      4 now go to github/your-repo -> setings ->securits and variable -> actions -> new repo securits add 
         AWS_ACCESS_KEY_ID
         AWS_SECRET_ACCESS_KEY
now 
   crete cd.yml file in workfows make to select your prefered region 
   push to github 

