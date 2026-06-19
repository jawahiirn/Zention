import { cookies } from 'next/headers';
import { AppSidebar } from '@/components/layout/app-sidebar';
import type { SidebarVariantType } from '@/components/ui/sidebar';

export default async function SidebarLayout() {
  const cookieStore = await cookies();
  const sidebarVariant = (cookieStore.get('sidebar:variant')?.value ?? 'floating') as SidebarVariantType;

  return <AppSidebar variant={sidebarVariant} />;
}
