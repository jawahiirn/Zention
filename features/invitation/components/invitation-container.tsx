'use client';

import { useParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'sonner';
import { useInviteByEmailMutation } from '@/services/modules/workspace';
import { InvitationView } from './invitation-view';
import type { Tag } from './tag-input';

interface Props {
  onOpenChange: () => void;
}

export const InvitationContainer = ({ onOpenChange }: Props) => {
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params?.workspaceId;
  const { mutateAsync: invite, isPending } = useInviteByEmailMutation();

  const [tags, setTags] = React.useState<Tag[]>([]);

  const handleSendInvite = React.useCallback(
    async (tagsToSubmit: Tag[]) => {
      if (!workspaceId) {
        toast.error('Workspace ID not found.');
        return;
      }

      const validTags = tagsToSubmit.filter((t) => t.valid);
      const invalidTags = tagsToSubmit.filter((t) => !t.valid);

      if (validTags.length === 0) {
        if (tagsToSubmit.length > 0) {
          toast.error('Please enter at least one valid email.');
        } else {
          toast.error('No emails provided.');
        }
        return;
      }

      try {
        await Promise.all(
          validTags.map((tag) =>
            invite({
              workspaceId,
              data: { email: tag.email },
            })
          )
        );

        toast.success(`Successfully sent ${validTags.length} invitation(s)!`);

        // Update state to keep only invalid tags
        setTags(invalidTags);

        // If all emails were valid, close the dialog
        if (invalidTags.length === 0) {
          onOpenChange();
        }
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Failed to send invitations.');
      }
    },
    [workspaceId, invite, onOpenChange]
  );

  return (
    <InvitationView
      tags={tags}
      onTagsChange={setTags}
      onSubmit={handleSendInvite}
      onCancel={onOpenChange}
      isPending={isPending}
    />
  );
};
