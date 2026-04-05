'use client';

import * as React from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { LucideIcon } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

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
    <div className="flex flex-col gap-8">
      <label htmlFor={id} className="text-foreground/80 ml-4 text-sm font-semibold">
        {label}
      </label>
      <InputGroup
        className={`border-input focus-within:ring-zention-purple/20 h-48 bg-gray-100 transition-all focus-within:ring-2 ${error ? 'border-destructive' : ''}`}
      >
        <InputGroupAddon>
          <Icon className="text-muted-foreground size-20" />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...registration}
          className="text-base"
        />
        {renderRightAddon && renderRightAddon()}
      </InputGroup>
      {error && <p className="text-destructive ml-4 text-xs">{error}</p>}
    </div>
  );
}
