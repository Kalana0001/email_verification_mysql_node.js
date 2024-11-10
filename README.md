# Email Verification System

This is a full-stack email verification system built using Node.js, Express, React, and Nodemailer. The system allows users to sign up, receive a verification email, and verify their email addresses before they can log in.

## Features
- **User Registration**: Users can sign up by providing their email and password.
- **Email Verification**: Upon registration, users receive a verification email with a unique verification link.
- **Password Hashing**: User passwords are securely hashed before storing them in the database.
- **Error Handling**: Proper error messages for failed email delivery, server issues, and more.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Email Service**: Gmail via Nodemailer
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt (or any preferred hashing library)

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MySQL**: [Download MySQL](https://www.mysql.com/)
- **Gmail Account**: You'll need a Gmail account to send emails for verification. If you haven't done so already, consider enabling App-Specific Passwords for enhanced security.

### Clone the Repository
Clone the repository from GitHub and navigate into the project directory.

### Install Dependencies

#### Backend (Node.js & Express)
1. Navigate to the server directory.
2. Install the required backend dependencies using:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory and configure the necessary environment variables for your server, database, and Gmail credentials.

#### Frontend (React)
1. Navigate to the client directory.
2. Install the required frontend dependencies using:

   ```bash
   npm install
   ```

### Start the Project

#### Backend (Node.js)
Run the backend server:

```bash
npm start
```

The backend will be running on `http://localhost:4044`.

#### Frontend (React)
Start the React development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

## How to Use
1. **Sign Up**: Go to the frontend application and provide your email and password to register.
2. **Verify Email**: Check your inbox for an email with a verification link. Click on the link to verify your email.
3. **Login**: Once verified, you can log in to the application.

## Testing
You can use Postman or similar tools to test the API endpoints:

- **POST /signup**: To create a new user.
- **GET /verify-email/:token**: To verify the email address.
- **POST /login**: To log in with the registered email and password.

## Troubleshooting
- **500 Internal Server Error**: This error could happen if there’s an issue with the database connection or email sending. Make sure your `.env` file has the correct configuration.
- **Invalid Email or Password**: Double-check that you’re using a valid email address for signing up.
- **Email Not Received**: Check your spam folder, or ensure that the Gmail settings are configured correctly (less secure apps or 2FA).

## Contributing
If you’d like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure that your code follows the existing style and includes tests where necessary.
