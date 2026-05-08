'use client';

import { ArrowRightFromLine, ChevronDown, Ellipsis, PlusIcon, Settings, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSidebar } from '@/components/ui/sidebar';
import { TooltipMessage } from '@/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';

interface WorkspaceSwitcherProps {
  currentWorkspace: {
    name: string;
    memberCount: number;
    email: string;
  };
}

export function WorkspaceSwitcher({ currentWorkspace }: WorkspaceSwitcherProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const initials = currentWorkspace.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'text-lg justify-start gap-2 px-2 overflow-hidden min-w-0 transition-all',
            isCollapsed ? 'w-full justify-center p-0' : 'flex-1'
          )}
          variant="ghost"
          size={isCollapsed ? 'icon' : 'lg'}
        >
          {isCollapsed ? (
            <span className="flex items-center justify-center size-8 rounded bg-accent text-xs font-bold shrink-0">
              {initials}
            </span>
          ) : (
            <>
              <span className="truncate text-left font-semibold">{currentWorkspace.name}</span>
              <ChevronDown className="shrink-0 opacity-50 size-4" />
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[320px] rounded-xl min-w-[200px] p-0">
        <div className="flex flex-col w-full border-b p-4">
          <p className="text-base font-medium">{currentWorkspace.name}</p>
          <span className="text-sm text-gray-600">{currentWorkspace.memberCount} Member</span>
          <div className="flex items-center w-full mt-2">
            <TooltipMessage message="Settings">
              <Button variant="ghost" size="sm" className="px-2" onClick={() => {}}>
                <Settings className="size-4 mr-2" /> Settings
              </Button>
            </TooltipMessage>
            <TooltipMessage message="Invite Members">
              <Button variant="ghost" size="sm" className="px-2" onClick={() => {}}>
                <SquarePen className="size-4 mr-2" /> Invite members
              </Button>
            </TooltipMessage>
          </div>
        </div>

        <div className="bg-accent/50 w-full flex flex-col py-2">
          <div className="flex items-center justify-between w-full px-4 py-2">
            <p className="text-gray-500 text-xs truncate">{currentWorkspace.email}</p>
            <Button variant="secondary" size="icon-xs" className="shrink-0">
              <Ellipsis className="size-3" />
            </Button>
          </div>

          <TooltipMessage
            side="right"
            message={
              <div className="flex flex-col text-xs">
                <span>{currentWorkspace.memberCount} Member</span>
                <span>Free plan</span>
              </div>
            }
          >
            <Button variant="ghost" className="justify-start px-4 h-10 font-medium">
              {currentWorkspace.name}
            </Button>
          </TooltipMessage>

          <TooltipMessage message="Create New Workspace">
            <Button variant="ghost" className="justify-start px-4 h-10 text-blue-700 hover:text-blue-800 font-medium">
              <PlusIcon className="size-4 mr-2" /> New Workspace
            </Button>
          </TooltipMessage>

          <div className="border-t mt-2 pt-2">
            <Button variant="ghost" className="justify-start px-4 h-10 w-full text-destructive hover:text-destructive">
              <ArrowRightFromLine className="size-4 mr-2" />
              <p className="text-sm">Logout</p>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
