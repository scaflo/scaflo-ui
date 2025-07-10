// src/components/Button/Button.tsx
import { Loader2 } from "lucide-react";
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = React.forwardRef(
  (props, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: `${baseClasses} ${sizeClasses.md}`,
        ...props,
        children: [
          props.loading ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : props.leftIcon && /* @__PURE__ */ jsx("span", { className: "w-4 h-4", children: props.leftIcon }),
          !props.loading && props.children,
          !props.loading && props.rightIcon && /* @__PURE__ */ jsx("span", { className: "w-4 h-4", children: props.rightIcon })
        ]
      }
    );
  }
);
var Button_default = Button;

// src/components/Dropdown/Dropdown.tsx
import React2, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect
} from "react";
import { ChevronDown, Check, Minus } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DropdownContext = createContext(null);
var useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within Dropdown");
  }
  return context;
};
var Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
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
  return /* @__PURE__ */ jsx2(
    DropdownContext.Provider,
    {
      value: { isOpen, setIsOpen, triggerRef, contentRef },
      children: /* @__PURE__ */ jsx2("div", { className: "relative inline-block", children })
    }
  );
};
var DropdownTrigger = React2.forwardRef(({ children, onClick, showIcon = true, className = "", ...props }, ref) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdown();
  return /* @__PURE__ */ jsxs2(
    "button",
    {
      ref: (node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        triggerRef.current = node;
      },
      className: `inline-flex items-center gap-2 ${className}`,
      onClick: (e) => {
        onClick?.(e);
        setIsOpen(!isOpen);
      },
      "aria-expanded": isOpen,
      ...props,
      children: [
        children,
        showIcon && /* @__PURE__ */ jsx2(
          ChevronDown,
          {
            className: `w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`
          }
        )
      ]
    }
  );
});
DropdownTrigger.displayName = "DropdownTrigger";
var DropdownContent = React2.forwardRef(({ className = "", align = "start", children, ...props }, ref) => {
  const { isOpen, contentRef } = useDropdown();
  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx2(
    "div",
    {
      ref: (node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        contentRef.current = node;
      },
      className: `absolute top-full mt-1 z-50 bg-white border rounded-lg shadow-lg py-1 min-w-[160px] animate-in fade-in-0 slide-in-from-top-2 duration-200 ${alignmentClasses[align]} ${className}`,
      ...props,
      children
    }
  );
});
DropdownContent.displayName = "DropdownContent";
var DropdownItem = React2.forwardRef(
  ({
    className = "",
    children,
    onClick,
    icon,
    selected,
    destructive,
    ...props
  }, ref) => {
    const { setIsOpen } = useDropdown();
    return /* @__PURE__ */ jsxs2(
      "button",
      {
        ref,
        className: `w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2 transition-colors ${destructive ? "text-red-600 hover:bg-red-50 focus:bg-red-50" : ""} ${className}`,
        onClick: (e) => {
          onClick?.(e);
          setIsOpen(false);
        },
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx2("span", { className: "w-4 h-4 flex-shrink-0", children: icon }),
          /* @__PURE__ */ jsx2("span", { className: "flex-1", children }),
          selected && /* @__PURE__ */ jsx2(Check, { className: "w-4 h-4 flex-shrink-0" })
        ]
      }
    );
  }
);
DropdownItem.displayName = "DropdownItem";
var DropdownSeparator = React2.forwardRef(({ className = "", ...props }, ref) => /* @__PURE__ */ jsx2(
  "div",
  {
    ref,
    className: `h-px bg-gray-200 my-1 mx-2 ${className}`,
    ...props,
    children: /* @__PURE__ */ jsx2(Minus, { className: "w-full h-px text-gray-200" })
  }
));
DropdownSeparator.displayName = "DropdownSeparator";

// src/components/Modal/Modal.tsx
import React3, { createContext as createContext2, useContext as useContext2, useEffect as useEffect2, useRef as useRef2 } from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var ModalContext = createContext2(null);
var useModal = () => {
  const context = useContext2(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within Modal");
  }
  return context;
};
var Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef2(null);
  useEffect2(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx3(ModalContext.Provider, { value: { isOpen, onClose }, children: /* @__PURE__ */ jsxs3(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsx3("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }),
        /* @__PURE__ */ jsx3(
          "div",
          {
            ref: modalRef,
            className: "relative z-10 max-h-[90vh] max-w-[90vw] overflow-auto animate-in fade-in-0 zoom-in-95 duration-200",
            onClick: (e) => e.stopPropagation(),
            children
          }
        )
      ]
    }
  ) });
};
var ModalContent = React3.forwardRef(({ className = "", children, ...props }, ref) => /* @__PURE__ */ jsx3(
  "div",
  {
    ref,
    className: `bg-white rounded-lg shadow-xl border ${className}`,
    ...props,
    children
  }
));
ModalContent.displayName = "ModalContent";
var ModalHeader = React3.forwardRef(({ className = "", children, icon, ...props }, ref) => {
  const iconMap = {
    info: /* @__PURE__ */ jsx3(Info, { className: "w-5 h-5 text-blue-500" }),
    success: /* @__PURE__ */ jsx3(CheckCircle, { className: "w-5 h-5 text-green-500" }),
    warning: /* @__PURE__ */ jsx3(AlertTriangle, { className: "w-5 h-5 text-yellow-500" }),
    error: /* @__PURE__ */ jsx3(AlertCircle, { className: "w-5 h-5 text-red-500" })
  };
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref,
      className: `px-6 py-4 border-b flex items-center gap-3 ${className}`,
      ...props,
      children: [
        icon && iconMap[icon],
        /* @__PURE__ */ jsx3("div", { className: "flex-1", children })
      ]
    }
  );
});
ModalHeader.displayName = "ModalHeader";
var ModalBody = React3.forwardRef(({ className = "", children, ...props }, ref) => /* @__PURE__ */ jsx3("div", { ref, className: `px-6 py-4 ${className}`, ...props, children }));
ModalBody.displayName = "ModalBody";
var ModalFooter = React3.forwardRef(({ className = "", children, ...props }, ref) => /* @__PURE__ */ jsx3(
  "div",
  {
    ref,
    className: `px-6 py-4 border-t flex justify-end gap-3 ${className}`,
    ...props,
    children
  }
));
ModalFooter.displayName = "ModalFooter";
var ModalClose = React3.forwardRef(({ className = "", children, onClick, ...props }, ref) => {
  const { onClose } = useModal();
  return /* @__PURE__ */ jsx3(
    "button",
    {
      ref,
      className: `absolute top-4 right-4 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors ${className}`,
      onClick: (e) => {
        onClick?.(e);
        onClose();
      },
      ...props,
      children: children || /* @__PURE__ */ jsx3(X, { className: "w-4 h-4" })
    }
  );
});
ModalClose.displayName = "ModalClose";
export {
  Button_default as Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader
};
//# sourceMappingURL=index.js.map