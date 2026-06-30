import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Props {
  onOpenChange: () => void;
}
export const InvitationView = ({ onOpenChange }: Props) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className={'text-xl'}>
          Invite people <span className="text-bold">for free</span>
        </DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <div className="flex flex-col gap-2">
          <p className={'text-sm '}>Invite by email</p>
          <Input placeholder={'Email, comma or separated'} className={'!rounded-2xl !h-[45px]'} />
        </div>
      </div>
      <DialogFooter>
        <Button className={'rounded-xl'} variant={'ghost'} onClick={onOpenChange}>
          Cancel
        </Button>
        <Button className={'rounded-xl'} variant={'default'}>
          Send invite
        </Button>
      </DialogFooter>
    </>
  );
};
