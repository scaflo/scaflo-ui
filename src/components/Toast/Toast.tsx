"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils.js";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { createPortal } from "react-dom";

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: "info" | "success" | "error" | "warning";
  duration?: number;
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  onClose: (id: string) => void;
}

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id" | "onClose">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, "id" | "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: removeToast,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts }: { toasts: ToastProps[] }) {
  if (toasts.length === 0) return null;

  const groupedToasts = toasts.reduce(
    (acc, toast) => {
      const position = toast.position || "top-right";
      if (!acc[position]) acc[position] = [];
      acc[position].push(toast);
      return acc;
    },
    {} as Record<string, ToastProps[]>
  );

  return createPortal(
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div
          key={position}
          className={cn("fixed z-50 flex flex-col gap-2 p-4", {
            "top-4 right-4": position === "top-right",
            "bottom-4 right-4": position === "bottom-right",
            "top-4 left-4": position === "top-left",
            "bottom-4 left-4": position === "bottom-left",
          })}
        >
          {positionToasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      ))}
    </>,
    document.body
  );
}

function Toast({
  id,
  title,
  description,
  type = "info",
  duration = 5000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    info: Info,
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
  };

  const colors = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    success: "border-green-200 bg-green-50 text-green-900",
    error: "border-red-200 bg-red-50 text-red-900",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "relative flex w-80 items-start gap-3 rounded-md border p-4 shadow-lg",
        colors[type]
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <div className="font-medium">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 opacity-70 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
