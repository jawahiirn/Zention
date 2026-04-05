'use client';

import { useEffect } from 'react';
import { useI18n } from '@/features/i18n/use-i18n';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { Common, Details } = useI18n();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background flex h-[calc(100vh-10rem)] flex-col items-center justify-center p-8">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-destructive text-4xl font-bold">{Common.errorTitle}</h2>
        <p className="text-muted-foreground">{error.message || 'An unexpected error occurred'}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={reset} variant="destructive">
            {Details.retry}
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="outline">
            {Common.goHome}
          </Button>
        </div>
      </div>
    </div>
  );
}
