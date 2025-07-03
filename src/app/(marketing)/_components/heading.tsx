'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

export const Heading = () => {
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
      <Button>
        Enter Zention
        <ArrowRightIcon className={'ml-2 size-4'} />
      </Button>
    </div>
  );
};
