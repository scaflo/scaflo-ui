// "use client";

// import React, {
//   createContext,
//   useContext,
//   useRef,
//   useState,
//   useEffect,
// } from "react";
// import { ChevronDown, Check, Minus } from "lucide-react";

// interface DropdownContextType {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
//   triggerRef: React.RefObject<HTMLElement | null>;
//   contentRef: React.RefObject<HTMLDivElement | null>;
// }

// const DropdownContext = createContext<DropdownContextType | null>(null);

// const useDropdown = () => {
//   const context = useContext(DropdownContext);
//   if (!context) {
//     throw new Error("Dropdown components must be used within Dropdown");
//   }
//   return context;
// };

// interface DropdownProps {
//   children: React.ReactNode;
// }

// const Dropdown = ({ children }: DropdownProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const triggerRef = useRef<HTMLElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         contentRef.current &&
//         !contentRef.current.contains(event.target as Node) &&
//         triggerRef.current &&
//         !triggerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.addEventListener("keydown", handleEscape);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen]);

//   return (
//     <DropdownContext.Provider
//       value={{ isOpen, setIsOpen, triggerRef, contentRef }}
//     >
//       <div className="relative inline-block">{children}</div>
//     </DropdownContext.Provider>
//   );
// };

// const DropdownTrigger = React.forwardRef<
//   HTMLButtonElement,
//   React.ButtonHTMLAttributes<HTMLButtonElement> & {
//     showIcon?: boolean;
//   }
// >(({ children, onClick, showIcon = true, className = "", ...props }, ref) => {
//   const { isOpen, setIsOpen, triggerRef } = useDropdown();

//   return (
//     <button
//       ref={(node) => {
//         if (typeof ref === "function") ref(node);
//         else if (ref) ref.current = node;
//         (triggerRef as any).current = node;
//       }}
//       className={`inline-flex items-center gap-2 ${className}`}
//       onClick={(e) => {
//         onClick?.(e);
//         setIsOpen(!isOpen);
//       }}
//       aria-expanded={isOpen}
//       {...props}
//     >
//       {children}
//       {showIcon && (
//         <ChevronDown
//           className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//         />
//       )}
//     </button>
//   );
// });
// DropdownTrigger.displayName = "DropdownTrigger";

// const DropdownContent = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement> & {
//     align?: "start" | "center" | "end";
//   }
// >(({ className = "", align = "start", children, ...props }, ref) => {
//   const { isOpen, contentRef } = useDropdown();

//   const alignmentClasses = {
//     start: "left-0",
//     center: "left-1/2 -translate-x-1/2",
//     end: "right-0",
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={(node) => {
//         if (typeof ref === "function") ref(node);
//         else if (ref) ref.current = node;
//         (contentRef as any).current = node;
//       }}
//       className={`absolute top-full mt-1 z-50 bg-white border rounded-lg shadow-lg py-1 min-w-[160px] animate-in fade-in-0 slide-in-from-top-2 duration-200 ${alignmentClasses[align]} ${className}`}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// });
// DropdownContent.displayName = "DropdownContent";

// const DropdownItem = React.forwardRef<
//   HTMLButtonElement,
//   React.ButtonHTMLAttributes<HTMLButtonElement> & {
//     icon?: React.ReactNode;
//     selected?: boolean;
//     destructive?: boolean;
//   }
// >(
//   (
//     {
//       className = "",
//       children,
//       onClick,
//       icon,
//       selected,
//       destructive,
//       ...props
//     },
//     ref,
//   ) => {
//     const { setIsOpen } = useDropdown();

//     return (
//       <button
//         ref={ref}
//         className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2 transition-colors ${
//           destructive ? "text-red-600 hover:bg-red-50 focus:bg-red-50" : ""
//         } ${className}`}
//         onClick={(e) => {
//           onClick?.(e);
//           setIsOpen(false);
//         }}
//         {...props}
//       >
//         {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
//         <span className="flex-1">{children}</span>
//         {selected && <Check className="w-4 h-4 flex-shrink-0" />}
//       </button>
//     );
//   },
// );
// DropdownItem.displayName = "DropdownItem";

// const DropdownSeparator = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className = "", ...props }, ref) => (
//   <div
//     ref={ref}
//     className={`h-px bg-gray-200 my-1 mx-2 ${className}`}
//     {...props}
//   >
//     <Minus className="w-full h-px text-gray-200" />
//   </div>
// ));
// DropdownSeparator.displayName = "DropdownSeparator";

// export {
//   Dropdown,
//   DropdownTrigger,
//   DropdownContent,
//   DropdownItem,
//   DropdownSeparator,
// };




"use client";

import React, { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/use-click-outside.js";
import { useKeyboard } from "../../hooks/use-keyboard.js";
import { cn, createPortal } from "../../lib/utils.js";

interface DropdownProps {
  children: React.ReactNode;
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

const DropdownContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: { current: null },
});

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children, asChild }: DropdownTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = React.useContext(DropdownContext);

  const handleClick = () => setIsOpen(!isOpen);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  if (asChild) {
    return React.cloneElement(
      children as React.ReactElement<any>,
      {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        "aria-expanded": isOpen,
        "aria-haspopup": "menu",
        ref: (node: HTMLElement) => {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
          // If the child has its own ref, call it as well
          const { ref } = (children as any);
          if (typeof ref === "function") ref(node);
          else if (ref && typeof ref === "object") ref.current = node;
        }
      }
    );
  }

  return (
    <button
      ref={triggerRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      className="inline-flex items-center justify-center"
    >
      {children}
    </button>
  );
}

export function DropdownContent({
  children,
  className,
  align = "start",
}: DropdownContentProps) {
  const { isOpen, setIsOpen, triggerRef } = React.useContext(DropdownContext);
  const contentRef = useClickOutside<HTMLDivElement>(
    () => setIsOpen(false),
    isOpen
  );
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  useKeyboard("Escape", () => setIsOpen(false), isOpen);

  React.useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return createPortal(
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "fixed z-50 mt-1 min-w-32 rounded-md border bg-white p-1 shadow-lg",
        alignmentClasses[align],
        className
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  children,
  className,
  onSelect,
  disabled,
}: DropdownItemProps) {
  const { setIsOpen } = React.useContext(DropdownContext);

  const handleClick = () => {
    if (!disabled) {
      onSelect?.();
      setIsOpen(false);
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none transition-colors",
        disabled
          ? "pointer-events-none opacity-50"
          : "hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
