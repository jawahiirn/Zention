'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/utils';
import type { OnboardingValues } from '../../types/request';

export function WorkspaceNameStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OnboardingValues>();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4 w-full">
      <Input
        {...register('spaceName')}
        placeholder={`E.g: Jawahiir's Workspace`}
        className={cn(
          'focus-visible:border-primary! focus-visible:ring-primary/30! focus-visible:ring-[3px] h-15 sm:w-[60%] rounded-xl placeholder:text-lg text-lg! border-gray-400',
          errors.spaceName && 'border-destructive focus-visible:border-destructive! focus-visible:ring-destructive/30!'
        )}
      />
      {errors.spaceName && <p className="text-destructive text-sm mt-2">{errors.spaceName.message}</p>}
    </div>
  );
}
