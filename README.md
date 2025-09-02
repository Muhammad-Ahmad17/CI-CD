# Node.js Server with Local DynamoDB and CI/CD

## Prerequisites
- Node.js v16 or higher
- Docker (for running local DynamoDB)
- AWS account (for CD deployment)
- GitHub repository


## Setup (Local Development)
1. Clone the repository and delete the `.github` folder (if present).  
2. Install dependencies:
   ```
   npm install
   ```

3. Start local DynamoDB in Docker:

   ```bash
   npm run dynamodb
   ```

   * Ensure port `8000` is available.
4. Run the server:

   ```bash
   npm start
   ```
5. Run tests:

   ```bash
   npm test
   ```

---

## API Endpoints

* `GET /api/v1/hello`: Returns a hello message
* `POST /api/v1/users`: Creates a new user (requires `name` and `email`)
* `GET /api/v1/users`: Lists all users

---

## Database

* Uses **local DynamoDB** at `http://localhost:8000`
* `Users` table automatically created on server startup with fields:

  * `id` (partition key)
  * `name`
  * `email`

---

## Testing

* Uses **Jest** and **Supertest** for API testing
* Tests cover basic CRUD operations and error cases
* Tests clean up the table after completion

> **Note:** Ensure Docker is running before starting DynamoDB.

---

## CI Workflow

1. Push your repository to GitHub.
2. Create `.github/workflows/ci.yml`.
3. Make some changes in the code (e.g., add a new API or test) and push again.
4. GitHub Actions will run the CI workflow to verify your code changes.

---

## CD Workflow (Elastic Beanstalk)

### Prerequisites

1. Create an **IAM user** with access to S3 and Elastic Beanstalk.

2. Go to **Security Credentials → Access Keys** for the new user and save the keys.

3. Add repository secrets in GitHub:

   * `AWS_ACCESS_KEY_ID`
   * `AWS_SECRET_ACCESS_KEY`

4. Create an **S3 bucket** in AWS.

5. Create an **Elastic Beanstalk application and environment**.

### Environment Variables for CD

```yaml
AWS_REGION: us-east-1
EB_APP_NAME: <your-app>
EB_ENV_NAME: <your-env>
S3_BUCKET: <your-bucket>
```

### Steps

1. Create `.github/workflows/cd.yml` and configure it for your region.
2. Push changes to GitHub.
3. The workflow will automatically deploy your app to Elastic Beanstalk.

> After deployment, test your endpoints using the EB environment URL.

---
