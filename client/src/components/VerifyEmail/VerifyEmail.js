import React, { useState } from 'react';
import axios from 'axios';
import './VerifyEmail.css';

function VerifyEmail({ onClose }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://email-verification-mysql-node-js-server.vercel.app/verify', { email, verificationToken: token });
      setMessage(response.data);
    } catch (error) {
      setMessage('Invalid verification token');
    }
  };

  return (
    <div className="verify-email-overlay">
      <div className="verify-email-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Verify Email</h2>
        <form onSubmit={handleVerify} className="verify-email-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Verification Code"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
        {message && <p className="verify-message">{message}</p>}
      </div>
    </div>
  );
}

export default VerifyEmail;
