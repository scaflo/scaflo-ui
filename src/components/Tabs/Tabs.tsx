"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils.js";

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  equalWidth?: boolean;
}

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: "",
  setActiveTab: () => {},
});

const TabsListContext = React.createContext<{
  equalWidth: boolean;
}>({
  equalWidth: false,
});

function Tabs({
  children,
  defaultValue = "",
  value,
  onValueChange,
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalValue;
  const setActiveTab = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div
        className={cn("w-full border p-1 rounded border-black/20", className)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className, equalWidth = false }: TabsListProps) {
  return (
    <TabsListContext.Provider value={{ equalWidth }}>
      <div
        role="tablist"
        className={cn(
          "h-10 items-center justify-center rounded-md bg-gray-100 p-1",
          equalWidth ? "flex w-full" : "inline-flex", // Conditional flex/inline-flex and w-full
          className,
        )}
      >
        {children}
      </div>
    </TabsListContext.Provider>
  );
}

function TabsTrigger({
  children,
  value,
  className,
  disabled,
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const { equalWidth } = React.useContext(TabsListContext);
  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(value);
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-600 hover:text-gray-900",
        equalWidth && "flex-1", // Apply flex-1 if equalWidth is true
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
}

function TabsContent({ children, value, className }: TabsContentProps) {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      className={cn(
        "my-2 p-1 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
        className,
      )}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
