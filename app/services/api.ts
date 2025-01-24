import axios from 'axios';

// Bas-URL för API:t
const API_URL = 'http://localhost:8080/api/v1';

// Skapa en Axios-instans för att konfigurera standardvärden
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Typ för svaret från inloggnings-API:t
interface LoginResponse {
  id: number; // Om backend returnerar användarens ID
  token?: string; // Om backend skickar en token (JWT eller liknande)
}

// Funktion för att hantera inloggningsanrop
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  // Använd Axios generiska typning för att specificera LoginResponse
  const response = await api.post<LoginResponse>('/user/login', { username, password });
  console.log(response)
  return response.data; // Returnera typat svar från backend
};


// Function to handle registration (API call)
export const register = async (username: string, password: string): Promise<void> => {
  const response = await api.post("/user", {
    username,
    password,
  });
  return response.data; // Return backend response (can be a message or token)
};