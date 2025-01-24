import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/api'; // Import the API function for login
import { authService } from '../services/auth'; // Import authService to manage sessions
import axios from 'axios';

interface LoginResponse {
  userId: number;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Manage username
  const [password, setPassword] = useState<string>(''); // Manage password
  const [error, setError] = useState<string>(''); // Display error messages
  const router = useRouter(); // To handle navigation after login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: LoginResponse = await login(username, password);

      // Save userId (or token) in LocalStorage
      authService.login(response.userId);

      // Redirect to the To-Do List
      router.push('/todos');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Check if the backend sent a specific error message
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError('An error occurred while communicating with the server.');
        }
      } else {
        // Handle other types of errors
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Log In</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', width: '300px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
};

export default Login;
