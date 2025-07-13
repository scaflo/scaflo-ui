import type React from "react";
import { cn } from "../../lib/utils.js";

interface ScrollableProps {
  children: React.ReactNode;
  direction?: "x" | "y" | "both";
  className?: string;
  maxHeight: string;
  maxWidth: string;
}

export function Scrollable({
  children,
  direction = "y",
  className = "",
  maxHeight,
  maxWidth,
}: ScrollableProps) {
  const scrollClasses = {
    x: "overflow-x-auto overflow-y-hidden",
    y: "overflow-y-auto overflow-x-hidden",
    both: "overflow-auto",
  };

  return (
    <div
      className={cn(
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
        scrollClasses[direction],
        className
      )}
      style={{
        maxHeight,
        maxWidth,
      }}
    >
      {children}
    </div>
  );
}
