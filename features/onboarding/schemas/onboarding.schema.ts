import * as z from 'zod';

const emailSchema = z.email();

const onboardingSchema = z.object({
  purpose: z.string().optional(),
  inviteEmails: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const emails = val.split(/[,\s]+/).filter(Boolean);
        return emails.every((email: string) => emailSchema.safeParse(email).success);
      },
      { message: 'One or more email addresses are invalid' }
    ),
  spaceName: z.string().min(1),
});

export { emailSchema, onboardingSchema };
