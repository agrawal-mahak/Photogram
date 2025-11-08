import apiClient, { withAuth } from "./httpClient.js";

export const fetchPosts = async (token) => {
  const response = await apiClient.get("/api/posts", withAuth(token));
  return response.data;
};

export const fetchMyPosts = async (token) => {
  if (!token) {
    throw new Error("Missing token");
  }
  const response = await apiClient.get("/api/posts/my/posts", withAuth(token));
  return response.data;
};

export const createPost = async (formData, token) => {
  if (!token) {
    throw new Error("Missing token");
  }
  const response = await apiClient.post(
    "/api/posts",
    formData,
    withAuth(token)
  );
  return response.data;
};

export const updatePost = async (postId, formData, token) => {
  if (!token) {
    throw new Error("Missing token");
  }
  const response = await apiClient.put(
    `/api/posts/${postId}`,
    formData,
    withAuth(token)
  );
  return response.data;
};

export const deletePost = async (postId, token) => {
  if (!token) {
    throw new Error("Missing token");
  }
  await apiClient.delete(`/api/posts/${postId}`, withAuth(token));
};

export const toggleLike = async (postId, token) => {
  if (!token) {
    throw new Error("Missing token");
  }
  const response = await apiClient.post(
    `/api/posts/${postId}/like`,
    {},
    withAuth(token)
  );
  return response.data;
};

export const addComment = async (postId, payload, token) => {
  if (!token) {
    throw new Error("Missing token");
  }
  const response = await apiClient.post(
    `/api/posts/${postId}/comments`,
    payload,
    withAuth(token)
  );
  return response.data;
};


