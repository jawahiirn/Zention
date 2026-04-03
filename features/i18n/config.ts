const SUPPORTED_LOCALES = ['en'] as const;
export const DEFAULT_LOCALE = 'en';
type Locale = (typeof SUPPORTED_LOCALES)[number];

export const isValidLocale = (locale: string): locale is Locale => {
  return SUPPORTED_LOCALES.includes(locale as Locale);
};
