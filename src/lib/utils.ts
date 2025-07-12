import type React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createPortal as reactCreatePortal } from "react-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createPortal(
  children: React.ReactNode,
  container?: Element | null
) {
  if (typeof document === "undefined") return null;
  const portalContainer = container || document.body;
  return reactCreatePortal(children, portalContainer);
}
