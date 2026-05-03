import type { z } from 'zod';
import type { authStatusSchema, loginResponseSchema, signupResponseSchema } from '@/services/schemas';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type SignupResponse = z.infer<typeof signupResponseSchema>;
export type AuthStatusResponse = z.infer<typeof authStatusSchema>;
