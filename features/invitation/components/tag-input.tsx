'use client';

import { X } from 'lucide-react';
import * as React from 'react';
import { z } from 'zod';
import { cn } from '@/utils/utils';

export interface Tag {
  id: string;
  email: string;
  valid: boolean;
}

interface TagInputProps {
  tags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  placeholder?: string;
  className?: string;
  onSubmit?: (finalTags: Tag[]) => void;
}

const emailSchema = z.string().email();

export function TagInput({ tags, onTagsChange, placeholder, className, onSubmit }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const getNewTagsFromText = React.useCallback((text: string): Tag[] => {
    const parts = text
      .split(/[,\s]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    return parts.map((part) => {
      const isValid = emailSchema.safeParse(part).success;
      return {
        id: `${part}-${Date.now()}-${Math.random()}`,
        email: part,
        valid: isValid,
      };
    });
  }, []);

  const addEmails = React.useCallback(
    (text: string) => {
      const newTags = getNewTagsFromText(text);
      if (newTags.length === 0) return;

      onTagsChange([...tags, ...newTags]);
      setInputValue('');
    },
    [tags, onTagsChange, getNewTagsFromText]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addEmails(inputValue);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const newTags = inputValue.trim() ? getNewTagsFromText(inputValue) : [];
      const finalTags = [...tags, ...newTags];

      if (newTags.length > 0) {
        onTagsChange(finalTags);
        setInputValue('');
      }

      if (onSubmit) {
        onSubmit(finalTags);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag on backspace if input is empty
      onTagsChange(tags.slice(0, -1));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    if (pastedText) {
      addEmails(pastedText);
    }
  };

  const removeTag = (id: string) => {
    onTagsChange(tags.filter((tag) => tag.id !== id));
  };

  const hasInvalid = tags.some((tag) => !tag.valid);

  return (
    <div className="flex flex-col gap-2">
      <label
        className={cn(
          'flex min-h-[45px] w-full flex-wrap gap-2 rounded-2xl border border-input bg-transparent px-4 py-2 text-base transition-all cursor-text focus-within:ring-2 focus-within:ring-zention-purple/20 focus-within:border-ring',
          hasInvalid && 'border-destructive focus-within:ring-destructive/20 focus-within:border-destructive',
          className
        )}
      >
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={cn(
              'flex items-center gap-1 rounded-md border px-2 py-0.5 text-sm transition-colors',
              tag.valid
                ? 'border-border bg-muted/30 text-foreground'
                : 'border-destructive bg-destructive/10 text-destructive'
            )}
          >
            <span>{tag.email}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag.id);
              }}
              className={cn(
                'rounded-full p-0.5 hover:bg-muted/50 transition-colors',
                tag.valid ? 'text-muted-foreground hover:text-foreground' : 'text-destructive hover:bg-destructive/20'
              )}
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => {
            if (inputValue.trim()) {
              addEmails(inputValue);
            }
          }}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none border-none py-0.5 text-base placeholder:text-muted-foreground"
        />
      </label>
      {hasInvalid && <p className="text-destructive ml-1 text-sm font-medium animate-fade-in">Invalid email format</p>}
    </div>
  );
}
