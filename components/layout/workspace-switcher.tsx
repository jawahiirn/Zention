'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronDownIcon, PlusIcon, SettingsIcon, UserPlusIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ModalTypes, useModal } from '@/providers/modal-provider';
import { useWorkspaceMembersQuery, workspaceQueries } from '@/services/modules/workspace';

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { data: workspaces } = useQuery(workspaceQueries.list());
  const { data: members } = useWorkspaceMembersQuery(workspaceId);
  const { openModal } = useModal();

  const current = workspaces?.find((w) => w.id === workspaceId);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} className={'rounded-lg h-8 items-center'}>
          <PlaceholderAvatar
            seed={workspaceId}
            name={current?.name}
            size={26}
            iconColor={current?.iconColor}
            rounded={'lg'}
          />
          <span className={'text-base flex items-center'}>{current?.name}</span>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'start'} side={'bottom'} className={'rounded-lg px-2 !pb-0 w-90'}>
        <div className="py-2">
          <div className="flex items-center gap-2">
            <PlaceholderAvatar
              seed={workspaceId}
              name={current?.name}
              size={36}
              fontSize={16}
              iconColor={current?.iconColor}
              rounded={'lg'}
              chars={1}
            />
            <div className="flex flex-col">
              <span className={'text-base'}>{current?.name}</span>
              <span className={'text-base'}>{members?.length ?? 0} members</span>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full gap-x-2 py-4">
          <Button className={'flex-1'}>
            <SettingsIcon />
            Settings
          </Button>
          <Button className={'flex-1'} onClick={() => openModal(ModalTypes.INVITATION)}>
            <UserPlusIcon />
            Invite
          </Button>
        </div>
        <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto">
          {workspaces?.map((workspace) => (
            <Button
              variant={'ghost'}
              className={'rounded-lg justify-start w-full px-1'}
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
        <div className="border-t py-1 ">
          <Button
            variant="ghost"
            className="w-full gap-2 rounded-lg px-1"
            onClick={() => openModal(ModalTypes.ONBOARDING)}
          >
            <PlusIcon className="size-4" />
            Create Workspace
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
