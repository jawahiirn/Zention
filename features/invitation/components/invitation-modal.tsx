'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InvitationContainer } from './invitation-container';

interface InvitationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvitationModal({ open, onOpenChange }: InvitationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="rounded-2xl flex flex-col p-6">
        <DialogHeader>
          <DialogTitle className={'text-xl font-bold'}>
            Invite people <span className="font-semibold text-primary">for free</span>
          </DialogTitle>
        </DialogHeader>
        <InvitationContainer onOpenChange={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
