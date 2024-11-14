import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbConnectionMessage, setDbConnectionMessage] = useState(''); // To store DB connection status
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setMessage('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://email-verification-mysql-node-js-server.vercel.app/signup', { email, password });
      setMessage(response.data); // Successful signup message
      setEmail('');
      setPassword('');
      setLoading(false);

      // Redirect to /verify after successful signup
      navigate('/verify');
    } catch (error) {
      setMessage(error.response?.data || 'Error signing up. Please try again.');
      setLoading(false);
    }
  };

  // Function to test DB connection
  const handleTestDbConnection = async () => {
    setDbConnectionMessage('Testing database connection...');
    try {
      const response = await axios.get('https://email-verification-mysql-node-js-server.vercel.app/test-db');
      setDbConnectionMessage(response.data); // Set message from DB test route
    } catch (error) {
      setDbConnectionMessage('Error connecting to the database. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {message && <p className="signup-message">{message}</p>}

      {/* Button to test DB connection */}
      <button onClick={handleTestDbConnection} disabled={loading}>
        Test Database Connection
      </button>

      {/* Display DB connection message */}
      {dbConnectionMessage && <p className="db-connection-message">{dbConnectionMessage}</p>}
    </div>
  );
}

export default Signup;
