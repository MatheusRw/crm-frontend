import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // backend FastAPI local

export const api = axios.create({
  baseURL: API_URL,
});

// opcional: para setar/remover token JWT automaticamente
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
