'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { EyeIcon, EyeOffIcon, Loader2, LockIcon, MailIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { InputGroupAddon } from '@/components/ui/input-group';
import { useI18n } from '@/features/i18n/use-i18n';
import { useLoginMutation } from '@/services/modules/auth';
import { useAuthToken } from '@/shared/hooks/use-auth-token';
import { type LoginFormValues, loginSchema } from '../schemas/auth.schema';
import { AuthFormField } from './auth-form-field';
import { AuthCardShell } from './container/auth-card-shell';

export function LoginForm() {
  const { Auth } = useI18n();
  const [showPassword, setShowPassword] = React.useState(false);
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

  const { mutate: login, isPending } = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: (loginRes) => {
        setToken(loginRes.accessToken);
        const isOnboarded = false;
        Cookies.set('has_onboarded', String(isOnboarded));

        if (isOnboarded) {
          toast.success('Welcome back!');
          router.push('/pokemon');
        } else {
          toast.info('Please complete your onboarding');
          router.push('/onboarding');
        }
      },
      onError: () => {
        toast.error('Authentication failed');
      },
    });
  };

  return (
    <AuthCardShell title={Auth.login.title} isPending={isPending}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <AuthFormField
          id="email"
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
                  <EyeOffIcon className="text-muted-foreground size-5" />
                ) : (
                  <EyeIcon className="text-muted-foreground size-5" />
                )}
              </Button>
            </InputGroupAddon>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="hover:bg-purple/90 text-base shadow-zention-purple/50 mt-2 h-12 w-full rounded-xl bg-purple-500 font-bold text-white shadow-lg transition-all"
        >
          {isPending ? <Loader2 className="mr-2 size-5 animate-spin" /> : null}
          {Auth.login.submit}
        </Button>
      </form>
    </AuthCardShell>
  );
}
