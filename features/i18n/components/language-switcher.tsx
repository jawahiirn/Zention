'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { setLocaleCookie } from '@/features/i18n/locale';
import { useTransition } from 'react';
import { useI18n } from '@/features/i18n/use-i18n';

export default function LanguageSwitcher() {
  const { Index } = useI18n();
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = async () => {
    const nextLocale = locale === 'en' ? 'bn' : 'en';

    startTransition(async () => {
      await setLocaleCookie(nextLocale);
      router.refresh();
    });
  };

  return (
    <Button onClick={toggleLanguage} variant="outline" size="sm" disabled={isPending}>
      {Index.switchLanguage} ({locale.toUpperCase()})
    </Button>
  );
}
