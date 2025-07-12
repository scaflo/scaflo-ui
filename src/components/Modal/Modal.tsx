"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import { useClickOutside } from "../../hooks/use-click-outside.js";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils.js";
import { SizeVariables } from "../../variables/variables.js";
import { Button } from "../Button/Button.js";
import { X } from "lucide-react";
import {
  backdropVariants,
  ModalVariant,
  modalVariants,
} from "../../variables/modal.variants.js";

import { motion } from "framer-motion";

const ModalContext = createContext<{ onClose: () => void } | null>(null);
const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("Modal sub-components must be used inside <Modal />");
  return ctx;
};

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size: keyof typeof SizeVariables;
  hideCloseButton?: boolean;
  variant?: ModalVariant;
}

const Modal: React.FC<Modal> = ({
  isOpen,
  onClose,
  children,
  size = "md",
  hideCloseButton = false,
  variant = "fade",
}) => {
  // const contentRef = useClickOutside<HTMLDivElement>(onClose);
  const contentRef = useClickOutside<HTMLDivElement>({
    handler: onClose,
    enabled: isOpen,
  });

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        aria-modal="true"
        role="dialog"
        className={cn(
          "fixed inset-0 z-[2000] flex items-center justify-center overflow-y-auto bg-black/10 backdrop-blur-xs"
        )}
      >
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants[variant]}
          ref={contentRef}
          className={cn(
            "md:p-3 p-2 w-full overflow-y-auto relative ring-1 ring-black/10 rounded-md bg-white shadow-lg",
            SizeVariables[size]
          )}
        >
          {!hideCloseButton && (
            <Button
              className="absolute top-2 z-10 right-2 p-1 shadow-md ring-1 transition-all hover:ring-2 hover:scale-105 ring-black/10 hover:ring-black/10 !rounded-full"
              onClick={onClose}
            >
              <X />
            </Button>
          )}
          {children}
        </motion.div>
      </motion.div>
    </ModalContext.Provider>,
    document.body
  );
};
const ModalHeader = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      role="dialog-header"
      className={cn("flex relative justify-between p-2 border-b", className)}
    >
      {children}
    </div>
  );
};
const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div role="dialog-footer" className={cn("md:p-3 p-2 border-t", className)}>
      {children}
    </div>
  );
};

const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div role="dialog-body" className={cn("md:p-3 p-2 my-5", className)}>
      {children}
    </div>
  );
};

export {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useModalContext,
  ModalVariant,
};

// (Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle);
