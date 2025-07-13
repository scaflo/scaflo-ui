// "use client";

// import type React from "react";

// import { createContext, type ReactNode, useContext, useEffect } from "react";
// import { createPortal } from "react-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { cn } from "../../lib/utils.js";
// import {
//   sheetVariants,
//   sheetBackdropVariants,
//   type SheetVariant,
// } from "../../variables/sheet.variants.js";

// const SheetContext = createContext<{ onClose: () => void } | null>(null);

// const useSheetContext = () => {
//   const ctx = useContext(SheetContext);
//   if (!ctx)
//     throw new Error("Sheet sub-components must be used inside <Sheet />");
//   return ctx;
// };

// interface SheetProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
//   variant?: SheetVariant;
//   size?: "sm" | "md" | "lg" | "xl" | "full";
//   hideCloseButton?: boolean;
//   className?: string;
// }

// const sizeVariants = {
//   sm: "w-80",
//   md: "w-96",
//   lg: "w-[32rem]",
//   xl: "w-[40rem]",
//   full: "w-full",
// };

// const getSheetPositioning = (variant: SheetVariant) => {
//   switch (variant) {
//     case "left":
//       return "left-0 top-0 h-full";
//     case "right":
//       return "right-0 top-0 h-full";
//     case "top":
//       return "top-0 left-0 w-full h-80";
//     case "bottom":
//       return "bottom-0 left-0 w-full h-80";
//     case "fade":
//     case "pop":
//     case "slide-up":
//     case "slide-down":
//       return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
//     default:
//       return "right-0 top-0 h-full";
//   }
// };

// const Sheet: React.FC<SheetProps> = ({
//   isOpen,
//   onClose,
//   children,
//   variant = "right",
//   size = "md",
//   hideCloseButton = false,
//   className,
// }) => {
//   useEffect(() => {
//     if (!isOpen) return;

//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };

//     document.addEventListener("keydown", handler);
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", handler);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen &&
//         createPortal(
//           <SheetContext.Provider value={{ onClose }}>
//             <motion.div
//               variants={sheetBackdropVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
//               onClick={handleBackdropClick}
//               aria-modal="true"
//               role="dialog"
//             >
//               <motion.div
//                 variants={sheetVariants[variant]}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 className={cn(
//                   "fixed bg-white shadow-xl",
//                   getSheetPositioning(variant),
//                   variant === "left" || variant === "right"
//                     ? sizeVariants[size]
//                     : "",
//                   variant === "top" || variant === "bottom" ? "w-full" : "",
//                   variant === "fade" ||
//                     variant === "pop" ||
//                     variant === "slide-up" ||
//                     variant === "slide-down"
//                     ? `${sizeVariants[size]} max-h-[80vh] rounded-lg`
//                     : "",
//                   className
//                 )}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {!hideCloseButton && (
//                   <button
//                     onClick={onClose}
//                     className="absolute right-4 top-4 z-10 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-900"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 )}
//                 <div className="h-full overflow-y-auto">{children}</div>
//               </motion.div>
//             </motion.div>
//           </SheetContext.Provider>,
//           document.body
//         )}
//     </AnimatePresence>
//   );
// };

// const SheetHeader = ({
//   children,
//   className,
// }: {
//   children: ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div role="dialog-header" className={cn("border-b p-6 pb-4", className)}>
//       {children}
//     </div>
//   );
// };

// const SheetTitle = ({
//   children,
//   className,
// }: {
//   children: ReactNode;
//   className?: string;
// }) => {
//   return (
//     <h2
//       className={cn(
//         "text-lg font-semibold leading-none tracking-tight",
//         className
//       )}
//     >
//       {children}
//     </h2>
//   );
// };

// const SheetDescription = ({
//   children,
//   className,
// }: {
//   children: ReactNode;
//   className?: string;
// }) => {
//   return (
//     <p className={cn("text-sm text-gray-600 mt-2", className)}>{children}</p>
//   );
// };

// const SheetContent = ({
//   children,
//   className,
// }: {
//   children: ReactNode;
//   className?: string;
// }) => {
//   return <div className={cn("p-6 pt-0", className)}>{children}</div>;
// };

// const SheetFooter = ({
//   children,
//   className,
// }: {
//   children: ReactNode;
//   className?: string;
// }) => {
//   return <div className={cn("border-t p-6 pt-4", className)}>{children}</div>;
// };

// export {
//   Sheet,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetContent,
//   SheetFooter,
//   useSheetContext,
//   type SheetVariant,
// };
