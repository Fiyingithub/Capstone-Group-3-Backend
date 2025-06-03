# Savings app tracker

- Express JS APP.
- API.
- Create User.

## What do we need?

- API
- CRUD Operation
- config, dotenv
- validation
- pagination
- sequelize, mysql2, express-validator, express.

### Installation

Clone the repository: `bash git clone cd `

Install dependencies: `bash npm install `

Create a MySQL database

Configure environment variables:

Copy .env.example to .env
Update the values in .env with your configuration
Start the server: ```bash

#### Development

npm run dev

##### Production

npm start ```

###### API Endpoints

# Authentication

POST /api/users/signup - Register a new user and get OTP in your mail
POST /api/users/signin - Login user 
POST /api/users/verifyOtp - VerifyOtp (protected)
GET /api/users/{id} - Get a user By Id (protected)
GET /api/users - Get all users (protected)
PATCH /api/users/updateUserDetails  - Update User Profile (protected) 
PATCH /api/users/changePassword - Change password (protected)
DELETE  /api/users/{id}  - Delete a specific user (protected)
