const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins
}));

// MySQL Database connection
let db;

// Function to initialize the database connection
const initDbConnection = async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('Connected to the MySQL database.');
  } catch (err) {
    console.error('Database connection failed:', err.stack);
  }
};

// Initialize DB connection
initDbConnection();

// Email transporter setup using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const verificationToken = Math.floor(100000 + Math.random() * 900000);

  try {
    const query = 'INSERT INTO customers (email, password, verification_token) VALUES (?, ?, ?)';
    await db.query(query, [email, password, verificationToken]);

    // Prepare the email with instructions
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Please verify your email address',
      html: `
        <p>Dear user,</p>
        <p>Thank you for registering with us. Please use the following verification code to confirm your email address:</p>
        <h3 style="color: #4CAF50;">${verificationToken}</h3>
        <p>This code will expire in 10 minutes, so please enter it promptly.</p>
        <p><strong>Important:</strong> Please do not share this code with anyone. If you did not request this email, please ignore it.</p>
        <p>Best regards,</p>
        <p><strong>Your Company Name</strong></p>
        <p><em>If you have any questions, feel free to contact our support team.</em></p>
      `
    };

    // Send the verification email
    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).send('Error sending verification email');
      res.status(200).send('User created. Please check your email for verification.');
    });
  } catch (error) {
    res.status(500).send('Error saving user');
  }
});

// Verification route
app.post('/verify', async (req, res) => {
  const { email, verificationToken } = req.body;
  const query = 'SELECT * FROM customers WHERE email = ? AND verification_token = ?';

  try {
    const [result] = await db.query(query, [email, verificationToken]);
    if (result.length > 0) {
      const updateQuery = 'UPDATE customers SET verified = TRUE WHERE email = ?';
      await db.query(updateQuery, [email]);
      res.status(200).send('Email verified successfully!');
    } else {
      res.status(400).send('Invalid verification token');
    }
  } catch (error) {
    res.status(500).send('Error verifying email');
  }
});

// Test DB connection route
app.get('/test-db', async (req, res) => {
  try {
    if (db) {
      await db.query('SELECT 1'); // Basic query to test the connection
      res.status(200).send('Database connection is successful!');
    } else {
      res.status(500).send('Database connection is not initialized.');
    }
  } catch (error) {
    console.error("Database Connection Test Error:", error);
    res.status(500).send('Error connecting to the database.');
  }
});

// Health check route
app.get('/', (req, res) => {
  res.send('Server Is Running!');
});

// Server setup
const port = process.env.PORT || 4044;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
