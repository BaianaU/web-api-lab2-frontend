import React, { useState } from "react";
import axios from "axios";

// Function to handle registration (API call)
const register = async (username: string, password: string): Promise<void> => {
  const response = await axios.post("http://localhost:8080/api/v1/auth/signup", {
    username,
    password,
  });
  return response.data; // Return backend response (can be a message or token)
};

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // Manage username
  const [password, setPassword] = useState<string>(""); // Manage password
  const [error, setError] = useState<string>(""); // Display error messages
  const [success, setSuccess] = useState<string>(""); // Display success messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    try {
      await register(username, password); // Call the backend API for registration
      setSuccess("Account successfully created! You can now log in.");
      setError("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error) {
          setError(err.response.data.error); // Show backend error message
        } else {
          setError("An error occurred while communicating with the server.");
        }
      } else {
        setError("An unknown error occurred.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="signup-form-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default SignupForm;
