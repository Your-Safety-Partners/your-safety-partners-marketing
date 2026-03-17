import * as React from 'react';
import { cn } from '@/lib/utils';

function TextArea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="input"
      className={cn(
        'flex w-full min-w-0 px-3 py-1 text-base rounded-md border border-input bg-transparent outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { TextArea };
