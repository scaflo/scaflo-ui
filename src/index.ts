import "./index.css";

import { Button } from "./components/Button/Button.js";

import { Avatar } from "./components/Avatar/Avatar.js";

import { AvatarGroup } from "./components/AvatarGroup/AvatarGroup.js";

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
  useAccordionContext,
} from "./components/Accordion/Accordion.js";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalVariant,
  useModalContext,
} from "./components/Modal/Modal.js";

import {
  OTPInput,
  type OTPInputProps,
} from "./components/OtpInput/OtpInput.js";

import { Scrollable } from "./components/Scrollable/Scrollable.js";

import {
  Pagination,
  PaginationProps,
} from "./components/Pagination/Pagination.js";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/Tabs/Tabs.js";

// import {
//   Sheet,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetContent,
//   SheetFooter,
//   useSheetContext,
//   type SheetVariant,
// } from "./components/Sheet/Sheet.js";

import { useToast, ToastProvider } from "./components/Toast/Toast.js";

export {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  type ModalVariant,
  useModalContext,
  AvatarGroup,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
  useAccordionContext,
  OTPInput,
  type OTPInputProps,
  Scrollable,
  // Sheet,
  // SheetHeader,
  // SheetTitle,
  // SheetDescription,
  // SheetContent,
  // SheetFooter,
  // useSheetContext,
  // type SheetVariant,
  useToast,
  ToastProvider,
  Pagination,
  PaginationProps,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
