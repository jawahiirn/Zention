'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { workspaceQueries } from '@/services/modules/workspace';

export const WorkspaceSwitcher = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { data: workspaces } = useQuery(workspaceQueries.list());

  const current = workspaces?.find((w) => w.id === workspaceId);
  return (
    <div className={''}>
      <Popover>
        <PopoverTrigger>
          <Button variant={'ghost'} className={'rounded-lg  h-8'}>
            <span className={'text-base'}>{current?.name}</span>
          </Button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
};
