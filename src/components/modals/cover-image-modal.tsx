'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCoverImage } from '@/hooks/use-cover-image';

export const CoverImageModal = () => {
  const coverImage = useCoverImage();
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogTitle>
        <span className="sr-only">Change Cover Image</span>
      </DialogTitle>
      <DialogContent>
        <DialogHeader>
          <span className="text-center text-lg font-semibold">Cover Image</span>
        </DialogHeader>
        {/*<SingleImageDropzone*/}
        {/*  className="w-full outline-none"*/}
        {/*  disabled={isSubmitting}*/}
        {/*  value={file}*/}
        {/*  onChange={onChange}*/}
        {/*/>*/}
      </DialogContent>
    </Dialog>
  );
};
