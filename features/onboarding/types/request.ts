import type { z } from 'zod';
import type { onboardingSchema } from '@/features/onboarding/schemas/onboarding.schema';

export type OnboardingValues = z.infer<typeof onboardingSchema>;
