import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('Common');

  return (
    <div className='bg-zention-gray-200 dark:bg-background flex min-h-screen flex-col items-center justify-center p-8 transition-colors duration-500'>
      <div className='relative flex flex-col items-center gap-24'>
        {/* Animated Brand Pulse */}
        <div className='relative flex items-center justify-center'>
          <div className='bg-zention-purple/20 absolute h-64 w-64 animate-ping rounded-full duration-[2000ms]'></div>
          <div className='bg-zention-purple shadow-zention-purple/40 flex h-48 w-48 items-center justify-center rounded-2xl shadow-xl'>
            <div className='h-24 w-24 animate-spin rounded-full border-4 border-white/30 border-t-white'></div>
          </div>
        </div>

        <div className='flex flex-col items-center gap-8'>
          <h2 className='text-zention-purple text-24 font-black tracking-widest uppercase'>Zention</h2>
          <p className='text-muted-foreground text-14 animate-pulse font-medium tracking-wide'>{t('loading')}...</p>
        </div>
      </div>
    </div>
  );
}
