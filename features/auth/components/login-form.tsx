'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuthToken } from '@/shared/hooks/use-auth-token';

import { useI18n } from '@/features/i18n/use-i18n';
import { Button } from '@/components/ui/button';
import { InputGroupAddon } from '@/components/ui/input-group';
import { AuthFormField } from './auth-form-field';
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema';
import { AuthCardShell } from './auth-card-shell';

export function LoginForm() {
  const { Auth } = useI18n();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const { setToken } = useAuthToken();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsPending(true);
    try {
      // 1. Authenticate (Replace with your actual endpoint)
      // const loginRes = await axiosRequest<{token: string}>({ url: '/auth/login', method: 'POST', data });
      // setToken(loginRes.token);

      // MOCK LOGIC for demo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setToken('fake-token-123');

      // 2. Immediate check for onboarding status
      // const statusRes = await axiosRequest<{isOnboarded: boolean}>({ url: '/auth/status', method: 'GET' });
      const isOnboarded = false; // This would come from your second API call

      // 3. Persist status and redirect
      Cookies.set('has_onboarded', String(isOnboarded));

      if (isOnboarded) {
        toast.success('Welcome back!');
        router.push('/pokemon');
      } else {
        toast.info('Please complete your onboarding');
        router.push('/onboarding');
      }
    } catch {
      toast.error('Authentication failed');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthCardShell title={Auth.login.title} isPending={isPending}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-16'>
        <AuthFormField
          id='email'
          label={Auth.emailLabel}
          placeholder={Auth.emailPlaceholder}
          type='email'
          icon={MailIcon}
          error={errors.email?.message}
          disabled={isPending}
          registration={register('email')}
        />

        <AuthFormField
          id='password'
          label={Auth.passwordLabel}
          placeholder={Auth.passwordPlaceholder}
          type={showPassword ? 'text' : 'password'}
          icon={LockIcon}
          error={errors.password?.message}
          disabled={isPending}
          registration={register('password')}
          renderRightAddon={() => (
            <InputGroupAddon align='inline-end'>
              <Button
                variant={'ghost'}
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='hover:text-foreground mr-[-4px] cursor-pointer rounded-lg transition-colors'
              >
                {showPassword ? (
                  <EyeOffIcon className='text-muted-foreground size-20' />
                ) : (
                  <EyeIcon className='text-muted-foreground size-20' />
                )}
              </Button>
            </InputGroupAddon>
          )}
        />

        <Button
          type='submit'
          disabled={isPending}
          className='bg-zention-purple hover:bg-zention-purple/90 text-16 shadow-zention-purple/20 mt-8 h-48 w-full rounded-xl font-bold text-white shadow-lg transition-all'
        >
          {isPending ? <Loader2 className='mr-8 size-20 animate-spin' /> : null}
          {Auth.login.submit}
        </Button>
      </form>
    </AuthCardShell>
  );
}
