'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { InvitationContainer } from './invitation-container';

interface InvitationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvitationModal({ open, onOpenChange }: InvitationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="rounded-2xl flex flex-col p-6">
        <InvitationContainer onOpenChange={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
