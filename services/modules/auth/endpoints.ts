import { axiosRequest } from '@/services/api-client';
import { loginResponseSchema } from '@/services/schemas/auth.schema';
import type { LoginRequest, LoginResponse, SignupRequest } from '@/services/types/auth.types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const result = await axiosRequest<LoginResponse>({
    url: '/auth/signin',
    method: 'POST',
    data,
  });
  return loginResponseSchema.parse(result);
};

export const signup = async (data: SignupRequest): Promise<void> => {
  await axiosRequest<void>({
    url: '/auth/signup',
    method: 'POST',
    data,
  });
};
