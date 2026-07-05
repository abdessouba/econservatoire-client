import axios from 'axios';

// Base URL of the Spring Boot backend. All eleve endpoints live under
// /api/eleve/auth (registration + sign in), country list under /api/pays.
export const API_BASE_URL = 'http://localhost:8080/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
