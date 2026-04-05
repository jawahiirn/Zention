'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, Loader2, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useI18n } from '@/features/i18n/use-i18n';
import { Button } from '@/components/ui/button';
import { InputGroupAddon } from '@/components/ui/input-group';
import { AuthFormField } from './auth-form-field';
import { signupSchema, type SignupFormValues } from '../schemas/auth.schema';
import { AuthCardShell } from './auth-card-shell';

export function SignupForm() {
  const { Auth } = useI18n();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsPending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Account created!');
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthCardShell title={Auth.signup.title} isPending={isPending}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-16">
        <AuthFormField
          id="fullName"
          label={Auth.fullNameLabel}
          placeholder={Auth.fullNamePlaceholder}
          icon={UserIcon}
          error={errors.fullName?.message}
          disabled={isPending}
          registration={register('fullName')}
        />

        <AuthFormField
          id={'email'}
          label={Auth.emailLabel}
          placeholder={Auth.emailPlaceholder}
          type="email"
          icon={MailIcon}
          error={errors.email?.message}
          disabled={isPending}
          registration={register('email')}
        />

        <AuthFormField
          id="password"
          label={Auth.passwordLabel}
          placeholder={Auth.passwordPlaceholder}
          type={showPassword ? 'text' : 'password'}
          icon={LockIcon}
          error={errors.password?.message}
          disabled={isPending}
          registration={register('password')}
          renderRightAddon={() => (
            <InputGroupAddon align="inline-end">
              <Button
                variant={'ghost'}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-foreground mr-[-4px] cursor-pointer rounded-lg transition-colors"
              >
                {showPassword ? (
                  <EyeOffIcon className="text-muted-foreground size-20" />
                ) : (
                  <EyeIcon className="text-muted-foreground size-20" />
                )}
              </Button>
            </InputGroupAddon>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="bg-zention-purple hover:bg-zention-purple/90 shadow-zention-purple/20 mt-8 h-48 w-full rounded-xl text-base font-bold text-white shadow-lg transition-all"
        >
          {isPending ? <Loader2 className="mr-8 size-20 animate-spin" /> : null}
          {Auth.signup.submit}
        </Button>
      </form>
    </AuthCardShell>
  );
}
