import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    as?: React.ElementType;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

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
declare function Dropdown({ children }: DropdownProps): react_jsx_runtime.JSX.Element;
declare function DropdownTrigger({ children, asChild }: DropdownTriggerProps): react_jsx_runtime.JSX.Element;
declare function DropdownContent({ children, className, align, }: DropdownContentProps): React.ReactPortal | null;
declare function DropdownItem({ children, className, onSelect, disabled, }: DropdownItemProps): react_jsx_runtime.JSX.Element;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}
declare function Modal({ isOpen, onClose, children, className }: ModalProps): React.ReactPortal | null;
declare function ModalHeader({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function ModalTitle({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function ModalBody({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function ModalFooter({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

export { Button, Dropdown, DropdownContent, DropdownItem, DropdownTrigger, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle };
