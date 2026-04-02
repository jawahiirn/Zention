'use server';

import { cookies } from 'next/headers';

export async function setLocaleCookie(locale: string) {
    const cookieStore = await cookies();
    cookieStore.set('NEXT_LOCALE', locale, { path: '/' });
}
