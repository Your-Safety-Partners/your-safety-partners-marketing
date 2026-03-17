import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import Spinner from '../ui/spinner';

type CustomButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  url?: string;
  title: string;
  isLoading?: boolean;
  width?: string;
  type?: 'button' | 'submit' | 'reset';
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
  buttonClass?: string;
  form?: string;
};

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      onClick,
      url,
      title,
      isLoading,
      width = 'px-[16px] py-[10px]',
      type = 'button',
      buttonProps = {},
      variant = 'default',
      disabled = false,
      className,
      leadingIcon,
      trailingIcon,
      buttonClass,
      form,
    },
    ref
  ) => {
    const content = (
      <span className="inline-flex justify-center items-center gap-2 w-full min-w-0 overflow-hidden">
        {isLoading === true ? (
          <div className="flex flex-row justify-center items-center gap-2 min-w-0 overflow-hidden">
            <Spinner
              size={16}
              color={
                variant === 'destructive'
                  ? 'text-white'
                  : variant === 'outline'
                    ? 'text-gray-700'
                    : 'text-white'
              }
            />
            <span className="truncate">{title}</span>
          </div>
        ) : (
          <>
            {leadingIcon && <span className="flex-shrink-0">{leadingIcon}</span>}
            <span className="truncate">{title}</span>
            {trailingIcon && <span className="flex-shrink-0">{trailingIcon}</span>}
          </>
        )}
      </span>
    );

    const finalButtonProps = {
      disabled: isLoading || disabled,
      type,
      variant,
      className: `h-[41px] ${width || 'min-w-[150px]'} ${isLoading ? 'opacity-50' : ''} ${buttonClass || ''}`.trim(),
      onClick: isLoading ? undefined : onClick,
      form,
      ...buttonProps,
    };

    if (url) {
      return (
        <Link
          href={url}
          className={`${isLoading ? 'pointer-events-none' : ''} ${className || ''}`.trim()}
        >
          <Button ref={ref} {...finalButtonProps}>{content}</Button>
        </Link>
      );
    }

    if (!buttonClass && className) {
      finalButtonProps.className = `${finalButtonProps.className} ${className}`.trim();
    }

    return <Button ref={ref} {...finalButtonProps}>{content}</Button>;
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
