import { InvitationView } from './invitation-view';

interface Props {
  onOpenChange: () => void;
}

export const InvitationContainer = ({ onOpenChange }: Props) => {
  return <InvitationView onOpenChange={onOpenChange} />;
};
