import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspaceRoot({ params }: Props) {
  const { workspaceId } = await params;
  redirect(`/${workspaceId}/home`);
}
