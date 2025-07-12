"use client";

import React from "react";
import { cn } from "../../lib/utils.js";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      as: Component = "button",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors disabled:cursor-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 text-sm";

      

    const isDisabled = disabled;

    return (
      <Component
        ref={ref}
        className={cn(baseStyles, className)}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Loader2
            className="mr-2 h-4 w-4 transition-all animate-spin"
            aria-hidden="true"
          />
        ) : (
          leftIcon && <span className="mr-2">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = "Button";
