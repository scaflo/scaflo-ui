"use client";

import React from "react";
import { cn } from "../../lib/utils.js";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      fullWidth,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "flex bg-black/30 ring-2 ring-inset ring-black/10 hover:opacity-95 duration-200 ease-in hover:scale-105 transition cursor-pointer items-center justify-center rounded-md font-medium disabled:cursor-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 text-sm";

    const isDisabled = disabled;

    return (
      <button
        ref={ref}
        role="button"
        className={cn(baseStyles, className, fullWidth && "!w-full")}
        disabled={isDisabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <Loader2
            className="mr-2 h-4 w-4 transition-all animate-spin"
            aria-hidden="true"
          />
        )}

        {!loading && (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);
