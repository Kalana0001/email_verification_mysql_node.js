const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// MySQL Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "KAlana#23",
  database: process.env.DB_NAME || "login_security"
});

// Connect to the database
db.connect(err => {
  if (err) console.error('Database connection failed:', err.stack);
  else console.log('Connected to the MySQL database.');
});

// Email transporter setup using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Signup route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const verificationToken = Math.floor(100000 + Math.random() * 900000);

  const query = 'INSERT INTO customers (email, password, verification_token) VALUES (?, ?, ?)';
  db.query(query, [email, password, verificationToken], (err) => {
    if (err) return res.status(500).send('Error saving user');

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
  });
});

// Verification route
app.post('/verify', (req, res) => {
  const { email, verificationToken } = req.body;
  const query = 'SELECT * FROM customers WHERE email = ? AND verification_token = ?';

  db.query(query, [email, verificationToken], (err, result) => {
    if (err) return res.status(500).send('Error verifying email');
    if (result.length > 0) {
      const updateQuery = 'UPDATE customers SET verified = TRUE WHERE email = ?';
      db.query(updateQuery, [email], (err) => {
        if (err) return res.status(500).send('Error updating verification status');
        res.status(200).send('Email verified successfully!');
      });
    } else {
      res.status(400).send('Invalid verification token');
    }
  });
});

// Server setup
const port = process.env.PORT || 4044;
app.listen(port, () => console.log(`Server running on port ${port}`));
