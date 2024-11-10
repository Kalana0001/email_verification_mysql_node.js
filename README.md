Email Verification System
This is a full-stack email verification system built using Node.js, Express, React, and Nodemailer. The system allows users to sign up, receive a verification email, and verify their email addresses before they can log in.

Features
User Registration: Users can sign up by providing their email and password.
Email Verification: Upon registration, users receive a verification email with a unique verification link.
Password Hashing: User passwords are securely hashed before storing in the database.
Error Handling: Proper error messages for failed email delivery, server issues, and more.
Tech Stack
Frontend: React
Backend: Node.js, Express
Database: MySQL
Email Service: Gmail via Nodemailer
Authentication: JWT (JSON Web Tokens)
Password Hashing: bcrypt (or any preferred hashing library)
Setup Instructions
Prerequisites
Node.js: Make sure you have Node.js installed. You can download it from here.
MySQL: You'll need MySQL to store user data. You can download it from here.
Gmail Account: You’ll need a Gmail account to send emails for verification. If you haven't done so already, consider enabling App-Specific Passwords for enhanced security.
Clone the Repository
bash
Copy code
git clone https://github.com/your-username/email-verification-system.git
cd email-verification-system
Install Dependencies
Backend (Node.js & Express)
Navigate to the server directory and install backend dependencies:
bash
Copy code
cd server
npm install
Create a .env file in the server directory and add the following:
makefile
Copy code
PORT=4044
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
Replace your_email@gmail.com and your_email_password with your Gmail credentials.
Replace your_jwt_secret, your_database_name, and your_database_user with appropriate values.
Frontend (React)
Navigate to the client directory and install frontend dependencies:
bash
Copy code
cd client
npm install
Start the Project
Backend (Node.js)
Run the backend server:
bash
Copy code
cd server
npm start
The server will run on http://localhost:4044.

Frontend (React)
Start the React development server:
bash
Copy code
cd client
npm start
The frontend will be available at http://localhost:3000.

How to Use
Sign Up: Go to the frontend application and provide your email and password to register.
Verify Email: Check your inbox for an email with a verification link. Click on the link to verify your email.
Login: Once verified, you can log in to the application.
Testing
You can use Postman or similar tools to test the API endpoints:
POST /signup: To create a new user.
GET /verify-email/
: To verify the email address.
POST /login: To log in with the registered email and password.
Troubleshooting
500 Internal Server Error: This error could happen if there’s an issue with the database connection or email sending. Make sure your .env file has the correct configuration.
Invalid Email or Password: Double-check that you’re using a valid email address for signing up.
Email Not Received: Check your spam folder, or ensure that the Gmail settings are configured correctly (less secure apps or 2FA).
Contributing
If you’d like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure that your code follows the existing style and includes tests where necessary.
