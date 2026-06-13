import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { getAuthToken } from '@/hooks/use-auth-token';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Handle Unauthorized (401)
    const isAuthRequest = error.config?.url?.includes('/auth/');

    if (error.response?.status === 401 && !isAuthRequest) {
      // Clear token and redirect to login only for PROTECTED requests
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }

    // 2. Surfacing backend error messages
    error.message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(error);
  }
);

type AxiosQueryParams = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};

export const axiosRequest = async <T>({ url, method = 'GET', data, params, headers }: AxiosQueryParams): Promise<T> => {
  try {
    const result = await apiClient<T>({
      url,
      method,
      data,
      params,
      headers,
    });
    return result.data;
  } catch (axiosError) {
    throw axiosError as AxiosError;
  }
};
