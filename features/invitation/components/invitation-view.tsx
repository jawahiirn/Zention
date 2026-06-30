'use client';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { type Tag, TagInput } from './tag-input';

interface Props {
  tags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  onSubmit: (tags: Tag[]) => void;
  onCancel: () => void;
  isPending: boolean;
}

export const InvitationView = ({ tags, onTagsChange, onSubmit, onCancel, isPending }: Props) => {
  return (
    <>
      <div className="py-4">
        <div className="flex flex-col gap-2">
          <p className={'text-sm font-semibold text-foreground/80'}>Invite by email</p>
          <TagInput
            tags={tags}
            onTagsChange={onTagsChange}
            onSubmit={onSubmit}
            placeholder="Email, comma or space separated"
          />
        </div>
      </div>
      <DialogFooter>
        <Button className={'rounded-xl h-11'} variant={'ghost'} onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button
          className={'rounded-xl h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold'}
          variant={'default'}
          onClick={() => onSubmit(tags)}
          disabled={isPending}
        >
          {isPending ? 'Sending...' : 'Send invite'}
        </Button>
      </DialogFooter>
    </>
  );
};
