import apiClient, { withAuth } from "./httpClient.js";

export const registerUser = async (payload) => {
  const response = await apiClient.post("/api/users/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await apiClient.post("/api/users/login", payload);
  return response.data;
};

export const getCurrentUser = async (token) => {
  if (!token) {
    throw new Error("Missing token");
  }
  const response = await apiClient.get("/api/users/me", withAuth(token));
  return response.data;
};

export const updateCurrentUser = async (formData, token) => {
  if (!token) {
    throw new Error("Missing token");
  }
  const response = await apiClient.put(
    "/api/users/me",
    formData,
    withAuth(token)
  );
  return response.data;
};


