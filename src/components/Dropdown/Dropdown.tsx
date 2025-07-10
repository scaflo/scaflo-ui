"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { ChevronDown, Check, Minus } from "lucide-react";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within Dropdown");
  }
  return context;
};

interface DropdownProps {
  children: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, triggerRef, contentRef }}
    >
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    showIcon?: boolean;
  }
>(({ children, onClick, showIcon = true, className = "", ...props }, ref) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdown();

  return (
    <button
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        (triggerRef as any).current = node;
      }}
      className={`inline-flex items-center gap-2 ${className}`}
      onClick={(e) => {
        onClick?.(e);
        setIsOpen(!isOpen);
      }}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      {showIcon && (
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      )}
    </button>
  );
});
DropdownTrigger.displayName = "DropdownTrigger";

const DropdownContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: "start" | "center" | "end";
  }
>(({ className = "", align = "start", children, ...props }, ref) => {
  const { isOpen, contentRef } = useDropdown();

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  if (!isOpen) return null;

  return (
    <div
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        (contentRef as any).current = node;
      }}
      className={`absolute top-full mt-1 z-50 bg-white border rounded-lg shadow-lg py-1 min-w-[160px] animate-in fade-in-0 slide-in-from-top-2 duration-200 ${alignmentClasses[align]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownContent.displayName = "DropdownContent";

const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode;
    selected?: boolean;
    destructive?: boolean;
  }
>(
  (
    {
      className = "",
      children,
      onClick,
      icon,
      selected,
      destructive,
      ...props
    },
    ref
  ) => {
    const { setIsOpen } = useDropdown();

    return (
      <button
        ref={ref}
        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2 transition-colors ${
          destructive ? "text-red-600 hover:bg-red-50 focus:bg-red-50" : ""
        } ${className}`}
        onClick={(e) => {
          onClick?.(e);
          setIsOpen(false);
        }}
        {...props}
      >
        {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
        {selected && <Check className="w-4 h-4 flex-shrink-0" />}
      </button>
    );
  }
);
DropdownItem.displayName = "DropdownItem";

const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`h-px bg-gray-200 my-1 mx-2 ${className}`}
    {...props}
  >
    <Minus className="w-full h-px text-gray-200" />
  </div>
));
DropdownSeparator.displayName = "DropdownSeparator";

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
};
