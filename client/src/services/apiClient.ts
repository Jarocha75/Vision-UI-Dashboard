import axios, { type AxiosRequestConfig, isAxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.data?.error) {
      error.message = error.response.data.error;
    }
    return Promise.reject(error);
  }
);

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    const res = await axiosInstance.get<T[]>(this.endpoint, config);
    return res.data;
  };

  get = async (id: string | number) => {
    const res = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
    return res.data;
  };

  post = async (data: Partial<T>) => {
    const res = await axiosInstance.post<T>(this.endpoint, data);
    return res.data;
  };

  put = async (id: string | number, data: Partial<T>) => {
    const res = await axiosInstance.put<T>(`${this.endpoint}/${id}`, data);
    return res.data;
  };

  delete = async (id: string | number) => {
    await axiosInstance.delete<T>(`${this.endpoint}/${id}`);
  };
}

export { axiosInstance as api };
export default APIClient;
