import type { z } from 'zod';
import type { loginResponseSchema } from '@/services/schemas/auth.schema';

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
