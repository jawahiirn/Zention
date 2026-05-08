'use client';

import { SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipMessage } from '@/components/ui/tooltip';

export function SidebarCreatePageButton() {
  return (
    <div className="flex items-center shrink-0 group-data-[collapsible=icon]:hidden">
      <TooltipMessage message="Create new page">
        <Button variant="ghost" size="icon-lg" className="size-8" onClick={() => {}}>
          <SquarePen className="size-4" />
        </Button>
      </TooltipMessage>
    </div>
  );
}
