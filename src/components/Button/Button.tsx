// import React from "react";
// import { Loader2 } from "lucide-react";

import { Loader2 } from "lucide-react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       className = "",
//       children,
//       variant = "default",
//       size = "md",
//       loading = false,
//       leftIcon,
//       rightIcon,
//       disabled,
//       ...props
//     },
//     ref
//   ) => {
//     const baseClasses =
//       "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

//     const variantClasses = {
//       default:
//         "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
//       primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
//       secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
//       outline:
//         "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
//       ghost:
//         "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
//       destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
//     };

//     const sizeClasses = {
//       sm: "px-3 py-1.5 text-sm",
//       md: "px-4 py-2 text-sm",
//       lg: "px-6 py-3 text-base",
//     };

//     return (
//       <button
//         ref={ref}
//         className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
//         disabled={disabled || loading}
//         {...props}
//       >
//         {loading ? (
//           <Loader2 className="w-4 h-4 animate-spin" />
//         ) : (
//           leftIcon && <span className="w-4 h-4">{leftIcon}</span>
//         )}
//         {children}
//         {!loading && rightIcon && <span className="w-4 h-4">{rightIcon}</span>}
//       </button>
//     );
//   }
// );
// Button.displayName = "Button";

// export default Button;

// import React from "react";

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   (props, ref) => {
//     const baseClasses =
//       "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded";

//     const sizeClasses = {
//       sm: "px-3 py-1.5 text-sm",
//       md: "px-4 py-2 text-sm",
//       lg: "px-6 py-3 text-base",
//     };
//     return (
//       <button
//         ref={ref}
//         className={`${baseClasses} ${sizeClasses.md}`}
//         {...props}
//       >
//         {props.loading ? (
//           <Loader2 className="w-4 h-4 animate-spin" />
//         ) : (
//           props.leftIcon && <span className="w-4 h-4">{props.leftIcon}</span>
//         )}
//         {!props.loading && props.children}
//         {!props.loading && props.rightIcon && (
//           <span className="w-4 h-4">{props.rightIcon}</span>
//         )}
//       </button>
//     );
//   },
// );

// export default Button;



import React from "react";
import { cn } from "../../lib/utils.js";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  as?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      fullWidth = false,
      as: Component = "button",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900",
      outline:
        "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-900",
      ghost: "hover:bg-gray-100 focus-visible:ring-gray-900",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
