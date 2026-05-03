import { axiosRequest } from '@/services/api-client';
import { authStatusSchema, loginResponseSchema, signupResponseSchema } from '@/services/schemas';
import type { AuthStatusResponse, LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/services/types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const result = await axiosRequest<LoginResponse>({
    url: '/auth/login',
    method: 'POST',
    data,
  });
  return loginResponseSchema.parse(result);
};

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const result = await axiosRequest<SignupResponse>({
    url: '/auth/signup',
    method: 'POST',
    data,
  });
  return signupResponseSchema.parse(result);
};

export const getAuthStatus = async (): Promise<AuthStatusResponse> => {
  const result = await axiosRequest<AuthStatusResponse>({
    url: '/auth/status',
  });
  return authStatusSchema.parse(result);
};
