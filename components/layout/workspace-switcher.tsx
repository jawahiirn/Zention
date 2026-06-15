'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useWorkspaceMembersQuery, workspaceQueries } from '@/services/modules/workspace';

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { data: workspaces } = useQuery(workspaceQueries.list());
  const { data: members } = useWorkspaceMembersQuery(workspaceId);

  const current = workspaces?.find((w) => w.id === workspaceId);
  return (
    <div className={''}>
      <Popover>
        <PopoverTrigger>
          <Button variant={'ghost'} className={'rounded-lg h-8'}>
            <PlaceholderAvatar
              seed={workspaceId}
              name={current?.name}
              size={26}
              iconColor={current?.iconColor}
              rounded={'lg'}
            />
            <span className={'text-base'}>{current?.name}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align={'start'} side={'bottom'} className={'rounded-lg px-2'}>
          <div className="py-2">
            <div className="flex items-center gap-2 pb-4">
              <PlaceholderAvatar
                seed={workspaceId}
                name={current?.name}
                size={40}
                fontSize={24}
                iconColor={current?.iconColor}
                rounded={'lg'}
              />
              <div className="flex flex-col">
                <span className={'text-base'}>{current?.name}</span>
                <span className={'text-base'}>{members?.length ?? 0} members</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {workspaces?.map((workspace) => (
              <Button
                variant={'ghost'}
                className={'rounded-lg justify-start w-full'}
                key={workspace.id}
                onClick={() => router.push(`/${workspace.id}/home`)}
              >
                <PlaceholderAvatar
                  seed={workspace.id}
                  name={workspace?.name}
                  size={24}
                  iconColor={workspace?.iconColor}
                  rounded={'lg'}
                />
                <span className={'text-base'}>{workspace?.name}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
