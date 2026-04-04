import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('Common');

  return (
    <div className='bg-background flex min-h-screen flex-col items-center justify-center p-8'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent'></div>
        <p className='text-muted-foreground animate-pulse text-xl font-medium italic'>{t('loading')}</p>
      </div>
    </div>
  );
}
