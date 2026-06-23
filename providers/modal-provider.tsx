'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { InvitationModal } from '@/features/invitation/components/invitation-modal';
import { OnboardingModal } from '@/features/onboarding/components/onboarding-modal';
import { useOnboardingComplete } from '@/features/onboarding/hooks/use-onboarding-complete';

export const ModalTypes = {
  ONBOARDING: 'onboarding',
  INVITATION: 'invitation',
} as const;

export type ModalId = (typeof ModalTypes)[keyof typeof ModalTypes];

interface ModalState {
  id: ModalId;
  props?: Record<string, unknown>;
}

interface ModalContextValue {
  openModal: (id: ModalId, props?: Record<string, unknown>) => void;
  closeModal: () => void;
  activeModal: ModalId | null;
  modalProps: Record<string, unknown> | null;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const { complete, isPending } = useOnboardingComplete();

  const openModal = useCallback((id: ModalId, props?: Record<string, unknown>) => {
    setModalState({ id, props });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(null);
  }, []);

  const value = useMemo<ModalContextValue>(
    () => ({
      openModal,
      closeModal,
      activeModal: modalState?.id ?? null,
      modalProps: modalState?.props ?? null,
    }),
    [openModal, closeModal, modalState]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <OnboardingModal
        open={modalState?.id === ModalTypes.ONBOARDING}
        onOpenChange={(v) => {
          if (!v) closeModal();
        }}
        onComplete={complete}
        isPending={isPending}
      />
      <InvitationModal
        open={modalState?.id === ModalTypes.INVITATION}
        onOpenChange={(v) => {
          if (!v) closeModal();
        }}
      />
    </ModalContext.Provider>
  );
}
