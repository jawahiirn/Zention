import Image from 'next/image';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { getTranslations } from 'next-intl/server';

export async function Header() {
  const t = await getTranslations('Index');

  return (
    <header className="flex w-full max-w-5xl items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-4">
        <Image 
          className="dark:invert hover:scale-105 transition-transform" 
          src="/next.svg" 
          alt="Next.js logo" 
          width={100} 
          height={20} 
          priority 
        />
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
