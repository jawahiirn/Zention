'use client';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className={'max-w-3xl space-y-4'}>
      <h1 className={'text-3xl sm:text-5xl md:text-6xl font-bold'}>
        Your ideas, documents & plans unified. Welcome to{' '}
        <span className={'underline'}>Zention</span>
      </h1>
      <h3 className={'text-base sm:text-xl md:text-2xl'}>
        Zention is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Spinner size="md" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Zention
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Zention free
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
