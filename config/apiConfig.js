/**
 * API Configuration
 * Central place to manage all API endpoints
 */

// Base API URL
export const API = "http://10.131.152.6:8000/api/";

// You can also export individual endpoints if needed
export const API_ENDPOINTS = {
  LOGIN: `${API}login`,
  SIGNUP: `${API}signup`,
  BUYER: `${API}buyer`,
  // Add more endpoints as needed
};

export default API;
