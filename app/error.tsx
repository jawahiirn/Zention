'use client';

import { useEffect } from 'react';
import { useI18n } from '@/features/i18n/use-i18n';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { Common, Details } = useI18n();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-4xl font-bold text-destructive">{Common.errorTitle}</h2>
        <p className="text-muted-foreground">{error.message || 'An unexpected error occurred'}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="default">
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
