import { axiosRequest } from '@/services/api-client';
import { loginResponseSchema, signupResponseSchema } from '@/services/schemas/auth.schema';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/services/types/auth.types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const result = await axiosRequest<LoginResponse>({
    url: '/auth/signin',
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
