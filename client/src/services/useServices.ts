import { api } from "@/services/apiClient";

export const userService = {
  getAll: () => api.get("/users"),
  getById: (id: number) => api.get(`/users/${id}`),
  create: (data: Record<string, unknown>) => api.post("/users", data),
  update: (id: number, data: Record<string, unknown>) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};
