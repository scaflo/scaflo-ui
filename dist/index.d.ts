import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface DropdownProps {
    children: React.ReactNode;
}
declare const Dropdown: ({ children }: DropdownProps) => react_jsx_runtime.JSX.Element;
declare const DropdownTrigger: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    showIcon?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    align?: "start" | "center" | "end";
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownItem: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode;
    selected?: boolean;
    destructive?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
declare const Modal: ({ isOpen, onClose, children }: ModalProps) => react_jsx_runtime.JSX.Element | null;
declare const ModalContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ModalHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    icon?: "info" | "success" | "warning" | "error";
} & React.RefAttributes<HTMLDivElement>>;
declare const ModalBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ModalFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const ModalClose: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;

export { Button, Dropdown, DropdownContent, DropdownItem, DropdownSeparator, DropdownTrigger, Modal, ModalBody, ModalClose, ModalContent, ModalFooter, ModalHeader };
