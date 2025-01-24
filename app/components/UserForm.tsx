import React, { useState } from "react";
import { login } from "../services/api";
import axios from "axios";

const UserForm: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // Hantera username
  const [password, setPassword] = useState<string>(""); // Hantera password
  const [error, setError] = useState<string>(""); // Visa eventuella fel
  const [success, setSuccess] = useState<string>(""); // Visa framgångsmeddelande

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Förhindra sidladdning

    try {
      const response = await login(username, password); // Anropa backend-API
      setSuccess("Inloggning lyckades!");
      setError("");
      console.log("Response from server:", response); // Eventuellt hantera token här
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        
        if (err.response?.data?.error) {
          setError(err.response.data.error); // Felmeddelande från backend
        } else {
          setError("Ett fel uppstod vid kommunikation med servern.");
        }
      } else {
        // Okänt fel
        setError("Ett okänt fel uppstod.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="user-form-container">
      <h1>Logga in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Logga in</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default UserForm;
