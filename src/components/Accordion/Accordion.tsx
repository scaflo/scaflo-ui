"use client";
import type React from "react";
import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "../../lib/utils.js";


interface AccordionContextType {
  openIndices: Set<number>;
  toggleIndex: (i: number) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordionContext = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx)
    throw new Error("Accordion components must be used within <Accordion />");
  return ctx;
};

interface AccordionProps {
  children: ReactNode;
  onChange?: (open: Set<number>) => void;
  allowMultiple?: boolean;
  defaultIndex?: number;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  onChange,
  allowMultiple = false,
  defaultIndex = 0,
  className,
}) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set([defaultIndex])
  );

  const toggleIndex = useCallback(
    (i: number) => {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(i)) {
          next.delete(i);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(i);
        }
        onChange?.(next);
        return next;
      });
    },
    [onChange, allowMultiple]
  );

  return (
    <AccordionContext.Provider value={{ openIndices, toggleIndex }}>
      <div className={cn("space-y-4", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  index: number;
  children: ReactNode;
  /**
   * Optional className for the accordion item container.
   */
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "rounded-lg overflow-hidden transition-all duration-300",
      "bg-card text-card-foreground shadow-sm hover:shadow-md", // Uses theme-aware shadcn/ui colors
      className
    )}
  >
    {children}
  </div>
);

interface AccordionHeaderProps {
  index: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | ReactNode;
  category?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  categoryClassName?: string;
  iconClassName?: string;
  chevronClassName?: string;
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  index,
  icon: Icon,
  category,
  children,
  className,
  titleClassName,
  categoryClassName,
  iconClassName,
  chevronClassName,
}) => {
  const { openIndices, toggleIndex } = useAccordionContext();
  const isOpen = openIndices.has(index);

  return (
    <button
      onClick={() => toggleIndex(index)}
      aria-expanded={isOpen}
      aria-controls={`acc-content-${index}`}
      className={cn(
        "w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="flex items-start space-x-4 flex-1 justify-center">
        <div className="flex justify-center items-center">
          {Icon ? (
            typeof Icon === "function" ? (
              <Icon className={cn("w-5 h-5", iconClassName)} />
            ) : (
              Icon
            )
          ) : (
            <HelpCircle className={cn("w-5 h-5", iconClassName)} />
          )}
        </div>
        <div className="flex-1">
          <h3
            className={cn(
              "text-lg font-semibold text-foreground pr-4",
              titleClassName
            )}
          >
            {children}
          </h3>
          {category && (
            <span
              className={cn(
                "inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full",
                categoryClassName
              )}
            >
              {category}
            </span>
          )}
        </div>
      </div>
      {isOpen ? (
        <ChevronUp
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            chevronClassName
          )}
        />
      ) : (
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            chevronClassName
          )}
        />
      )}
    </button>
  );
};

interface AccordionContentProps {
  index: number;
  children: ReactNode;
  /**
   * Optional className for the outer content container (handles max-h and opacity).
   */
  className?: string;
  /**
   * Optional className for the inner content div (handles padding).
   */
  contentClassName?: string;
  /**
   * Optional className for the paragraph element inside the content.
   */
  paragraphClassName?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  index,
  children,
  className,
  contentClassName,
  paragraphClassName,
}) => {
  const { openIndices } = useAccordionContext();
  const isOpen = openIndices.has(index);

  return (
    <div
      id={`acc-content-${index}`}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        "border-t border-black/20",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      <div className={cn("mt-2 pb-5 px-4", contentClassName)}>
        <p
          className={cn(
            "leading-relaxed text-muted-foreground",
            paragraphClassName
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
};

export { useAccordionContext };
