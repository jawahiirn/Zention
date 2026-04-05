'use client';

import { useState, useCallback, useMemo } from 'react';

interface UseMultiStepConfig {
  stepIds: string[];
  initialStepId?: string;
  onComplete?: () => void;
  onStepChange?: (stepId: string) => void;
  onBeforeNext?: (currentStepId: string) => boolean | Promise<boolean>;
}

interface MultiStepControls {
  currentStepId: string;
  stepIds: string[];
  isFirst: boolean;
  isLast: boolean;
  isValidating: boolean;
  error: string | null;
  progress: number;
  next: () => Promise<void>;
  back: () => void;
  goTo: (stepId: string) => void;
  reset: () => void;
}

function useMultiStep({
  stepIds,
  initialStepId,
  onComplete,
  onStepChange,
  onBeforeNext,
}: UseMultiStepConfig): MultiStepControls {
  const [currentStepId, setCurrentStepId] = useState(() => initialStepId || stepIds[0] || '');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state if stepIds changes dynamically
  const [prevStepIds, setPrevStepIds] = useState(stepIds);

  if (JSON.stringify(stepIds) !== JSON.stringify(prevStepIds)) {
    setPrevStepIds(stepIds);
    if (!stepIds.includes(currentStepId)) {
      const fallbackId = stepIds[0] || '';
      setCurrentStepId(fallbackId);
    }
  }

  const currentIndex = stepIds.indexOf(currentStepId);
  const totalSteps = stepIds.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSteps - 1;
  const progress = totalSteps > 1 ? (currentIndex / (totalSteps - 1)) * 100 : 100;

  const next = useCallback(async () => {
    setError(null);
    try {
      if (onBeforeNext) {
        setIsValidating(true);
        const canProceed = await onBeforeNext(currentStepId);
        setIsValidating(false);
        if (!canProceed) return;
      }

      if (isLast) {
        onComplete?.();
        return;
      }

      const nextIndex = Math.min(currentIndex + 1, totalSteps - 1);
      const nextId = stepIds[nextIndex];
      if (nextId) {
        setCurrentStepId(nextId);
        onStepChange?.(nextId);
      }
    } catch (err) {
      setIsValidating(false);
      setError(err instanceof Error ? err.message : 'Validation failed');
    }
  }, [currentStepId, currentIndex, isLast, totalSteps, stepIds, onComplete, onStepChange, onBeforeNext]);

  const back = useCallback(() => {
    setError(null);
    if (isFirst) return;
    const prevIndex = Math.max(0, currentIndex - 1);
    const prevId = stepIds[prevIndex];
    if (prevId) {
      setCurrentStepId(prevId);
      onStepChange?.(prevId);
    }
  }, [currentIndex, isFirst, stepIds, onStepChange]);

  const goTo = useCallback(
    (stepId: string) => {
      if (!stepIds.includes(stepId)) return;
      setError(null);
      setCurrentStepId(stepId);
      onStepChange?.(stepId);
    },
    [stepIds, onStepChange]
  );

  const reset = useCallback(() => {
    setError(null);
    const firstId = initialStepId || stepIds[0] || '';
    setCurrentStepId(firstId);
    onStepChange?.(firstId);
  }, [initialStepId, stepIds, onStepChange]);

  return useMemo(
    () => ({
      currentStepId,
      stepIds,
      isFirst,
      isLast,
      isValidating,
      error,
      progress,
      next,
      back,
      goTo,
      reset,
    }),
    [currentStepId, stepIds, isFirst, isLast, isValidating, error, progress, next, back, goTo, reset]
  );
}

export { useMultiStep };
export type { UseMultiStepConfig, MultiStepControls };
