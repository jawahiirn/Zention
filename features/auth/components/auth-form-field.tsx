'use client';

import type { LucideIcon } from 'lucide-react';
import type * as React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

interface AuthFormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  icon: LucideIcon;
  error?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
  renderRightAddon?: () => React.ReactNode;
}

export function AuthFormField({
  id,
  label,
  placeholder,
  type = 'text',
  icon: Icon,
  error,
  disabled,
  registration,
  renderRightAddon,
}: AuthFormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-foreground/80 ml-1 text-sm font-semibold">
        {label}
      </label>
      <InputGroup
        className={`border-input focus-within:ring-zention-purple/20 h-12 bg-gray-100 transition-all focus-within:ring-2 ${error ? 'border-destructive' : ''}`}
      >
        <InputGroupAddon>
          <Icon className="text-muted-foreground size-5" />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...registration}
          className="text-base"
        />
        {renderRightAddon?.()}
      </InputGroup>
      {error && <p className="text-destructive ml-1 text-xs">{error}</p>}
    </div>
  );
}
