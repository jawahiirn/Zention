import { cookies } from 'next/headers';
import type { SidebarVariantType } from '@/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/layout/app-sidebar';

export default async function SidebarLayout() {
  const cookieStore = await cookies();
  const sidebarVariant = (cookieStore.get('sidebar:variant')?.value ?? 'floating') as SidebarVariantType;

  return <AppSidebar variant={sidebarVariant} />;
}
