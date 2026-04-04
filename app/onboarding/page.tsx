'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear ALL auth cookies
    Cookies.remove('auth_token');
    Cookies.remove('has_onboarded');

    router.refresh(); // Refresh the page so the middleware takes over
    router.push('/');
  };

  return (
    <div className='bg-zention-gray-200 dark:bg-background flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='flex flex-col items-center gap-24 text-center'>
        <h1 className='text-32 text-foreground font-black'>Welcome to Zention!</h1>
        <p className='text-muted-foreground text-18 max-w-[400px]'>
          We're getting things ready for you. Please complete your onboarding steps.
        </p>

        {/* Logout area */}
        <div className='border-border/50 mt-32 w-full border-t pt-32'>
          <Button
            variant='ghost'
            onClick={handleLogout}
            className='text-muted-foreground hover:text-destructive gap-8 transition-colors'
          >
            <LogOut className='size-16' />
            Logout from session
          </Button>
        </div>
      </div>
    </div>
  );
}
