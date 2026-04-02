import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, isValidLocale } from './config';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeValue = cookieStore.get('NEXT_LOCALE')?.value || DEFAULT_LOCALE;

  const locale = isValidLocale(localeValue) ? localeValue : DEFAULT_LOCALE;

  try {
    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  } catch (error) {
    // Fallback to DEFAULT_LOCALE if locale file doesn't exist
    return {
      locale: DEFAULT_LOCALE,
      messages: (await import(`../../messages/${DEFAULT_LOCALE}.json`)).default,
    };
  }
});
