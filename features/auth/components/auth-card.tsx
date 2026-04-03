'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { GoogleIcon } from '@/shared/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema } from '../schemas/auth.schema';
import { toast } from 'sonner';

interface AuthCardProps {
  type: 'login' | 'signup';
}

export function AuthCard({ type }: AuthCardProps) {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const isSignup = type === 'signup';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
    defaultValues: isSignup ? { fullName: '', email: '', password: '' } : { email: '', password: '' },
  });

  const onSubmit = async (data: any) => {
    setIsPending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(isSignup ? 'Account created!' : 'Welcome back!');
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="p-20 sm:p-32 shadow-zention-medium border-none rounded-2xl bg-white dark:bg-card w-full max-w-[440px]">
      <CardContent className="flex flex-col gap-24 p-0">
        <h1 className="text-32 font-bold text-center text-foreground">
          {isSignup ? t('signup.title') : t('login.title')}
        </h1>

        {/* Google Login/Signup */}
        <Button
          variant="outline"
          type="button"
          disabled={isPending}
          className="w-full h-48 text-16 font-medium border-border hover:bg-accent transition-colors flex items-center justify-center gap-12"
        >
          <GoogleIcon className="size-20" />
          {t('googleButton')}
        </Button>

        {/* Separator */}
        <div className="relative flex items-center py-8">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-16 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {t('or')}
          </span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-16">
          {/* Full Name Field (Signup Only) */}
          {isSignup && (
            <div className="flex flex-col gap-8">
              <label htmlFor="fullName" className="text-sm font-semibold text-foreground/80 ml-4">
                {t('fullNameLabel')}
              </label>
              <InputGroup
                className={`h-48 bg-muted border-input focus-within:ring-2 focus-within:ring-zention-purple/20 transition-all ${errors.fullName ? 'border-destructive' : ''}`}
              >
                <InputGroupAddon>
                  <UserIcon className="size-20 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="fullName"
                  type="text"
                  placeholder={t('fullNamePlaceholder')}
                  disabled={isPending}
                  {...register('fullName')}
                  className="text-16 placeholder:text-muted-foreground"
                />
              </InputGroup>
              {errors.fullName && <p className="text-xs text-destructive ml-4">{errors.fullName.message as string}</p>}
            </div>
          )}

          <div className="flex flex-col gap-8">
            <label htmlFor="email" className="text-sm font-semibold text-foreground/80 ml-4">
              {t('emailLabel')}
            </label>
            <InputGroup
              className={`h-48 bg-muted border-input focus-within:ring-2 focus-within:ring-zention-purple/20 transition-all ${errors.email ? 'border-destructive' : ''}`}
            >
              <InputGroupAddon>
                <MailIcon className="size-20 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                disabled={isPending}
                {...register('email')}
                className="text-16 placeholder:text-muted-foreground"
              />
            </InputGroup>
            {errors.email && <p className="text-xs text-destructive ml-4">{errors.email.message as string}</p>}
          </div>

          <div className="flex flex-col gap-8">
            <label htmlFor="password" className="text-sm font-semibold text-foreground/80 ml-4">
              {t('passwordLabel')}
            </label>
            <InputGroup
              className={`h-48 bg-muted border-input focus-within:ring-2 focus-within:ring-zention-purple/20 transition-all ${errors.password ? 'border-destructive' : ''}`}
            >
              <InputGroupAddon>
                <LockIcon className="size-20 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                disabled={isPending}
                {...register('password')}
                className="text-16 placeholder:text-muted-foreground"
              />
              <InputGroupAddon align="inline-end">
                <Button
                  variant={'ghost'}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-foreground transition-colors cursor-pointer mr-[-4px] rounded-lg"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-20 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="size-20 text-muted-foreground" />
                  )}
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {errors.password && <p className="text-xs text-destructive ml-4">{errors.password.message as string}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-48 bg-zention-purple hover:bg-zention-purple/90 text-white text-16 font-bold rounded-xl shadow-lg shadow-zention-purple/20 transition-all mt-8"
          >
            {isPending ? <Loader2 className="size-20 animate-spin mr-8" /> : null}
            {isSignup ? t('signup.submit') : t('login.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
