import { z } from 'zod';
import { onboardingSchema } from '@/features/onboarding/schemas/onboarding.schema';

export type OnboardingValues = z.infer<typeof onboardingSchema>;
