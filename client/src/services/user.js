import axios from 'axios';

const baseUrl = "http://localhost:3001/api/login"; // TODO: Change the URL on Vite config file

export const login = async (email, password) => {
  try {
    const res = await axios.post(baseUrl, { email, password });
    const user = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload();
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const logout = () => {
  localStorage.removeItem("user");  
  window.location.reload();
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}