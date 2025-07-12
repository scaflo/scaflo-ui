// "use client";

// import React, { createContext, useContext, useEffect, useRef } from "react";
// import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

// interface ModalContextType {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ModalContext = createContext<ModalContextType | null>(null);

// const useModal = () => {
//   const context = useContext(ModalContext);
//   if (!context) {
//     throw new Error("Modal components must be used within Modal");
//   }
//   return context;
// };

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal = ({ isOpen, onClose, children }: ModalProps) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <ModalContext.Provider value={{ isOpen, onClose }}>
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center"
//         onClick={onClose}
//       >
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
//         <div
//           ref={modalRef}
//           className="relative z-10 max-h-[90vh] max-w-[90vw] overflow-auto animate-in fade-in-0 zoom-in-95 duration-200"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {children}
//         </div>
//       </div>
//     </ModalContext.Provider>
//   );
// };

// const ModalContent = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className = "", children, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={`bg-white rounded-lg shadow-xl border ${className}`}
//     {...props}
//   >
//     {children}
//   </div>
// ));
// ModalContent.displayName = "ModalContent";

// const ModalHeader = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement> & {
//     icon?: "info" | "success" | "warning" | "error";
//   }
// >(({ className = "", children, icon, ...props }, ref) => {
//   const iconMap = {
//     info: <Info className="w-5 h-5 text-blue-500" />,
//     success: <CheckCircle className="w-5 h-5 text-green-500" />,
//     warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
//     error: <AlertCircle className="w-5 h-5 text-red-500" />,
//   };

//   return (
//     <div
//       ref={ref}
//       className={`px-6 py-4 border-b flex items-center gap-3 ${className}`}
//       {...props}
//     >
//       {icon && iconMap[icon]}
//       <div className="flex-1">{children}</div>
//     </div>
//   );
// });
// ModalHeader.displayName = "ModalHeader";

// const ModalBody = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className = "", children, ...props }, ref) => (
//   <div ref={ref} className={`px-6 py-4 ${className}`} {...props}>
//     {children}
//   </div>
// ));
// ModalBody.displayName = "ModalBody";

// const ModalFooter = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className = "", children, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={`px-6 py-4 border-t flex justify-end gap-3 ${className}`}
//     {...props}
//   >
//     {children}
//   </div>
// ));
// ModalFooter.displayName = "ModalFooter";

// const ModalClose = React.forwardRef<
//   HTMLButtonElement,
//   React.ButtonHTMLAttributes<HTMLButtonElement>
// >(({ className = "", children, onClick, ...props }, ref) => {
//   const { onClose } = useModal();

//   return (
//     <button
//       ref={ref}
//       className={`absolute top-4 right-4 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors ${className}`}
//       onClick={(e) => {
//         onClick?.(e);
//         onClose();
//       }}
//       {...props}
//     >
//       {children || <X className="w-4 h-4" />}
//     </button>
//   );
// });
// ModalClose.displayName = "ModalClose";

// export { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose };



"use client";

import type React from "react";
import { useEffect } from "react";
import { useKeyboard } from "../../hooks/use-keyboard.js";
import { cn, createPortal } from "../../lib/utils.js";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  useKeyboard("Escape", onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function ModalTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function ModalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-end gap-2", className)}>{children}</div>
  );
}
