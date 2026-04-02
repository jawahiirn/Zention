'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { useI18n } from '@/features/i18n/use-i18n';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { Details, Common } = useI18n();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-4xl font-bold text-destructive">{Common.errorTitle}</h2>
        <p className="text-muted-foreground">{error.message || Details.error}</p>
        <div className="flex gap-4 justify-center">
            <Button onClick={reset} variant="default">
                {Details.retry}
            </Button>
            <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {Details.goBack}
            </Button>
        </div>
      </div>
    </div>
  );
}
