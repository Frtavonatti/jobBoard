import axios from 'axios';

const baseUrl = "http://localhost:3001/api/users"; // TODO: Change the URL on Vite config file

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, { email, password });
    const user = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = '/';
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const signup = async (email, password, role) => {
  try {
    const res = await axios.post(`${baseUrl}/signup`, { email, password, role });
    const user = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = '/';
    return res.data;
  } catch (error) {
    console.error("Registration failed:", error);
  }
}

export const logout = () => {
  localStorage.removeItem("user");  
  window.location.reload();
};
