"use client"

import { useEffect, useRef } from "react"

// want to use this like this
  // const contentRef = useClickOutside<HTMLDivElement>({
  //   handler: onClose,
  //   enabled: isOpen,
  // });

  interface UseClickOutsideOptions {
    handler: () => void;
    enabled?: boolean;
  }

export function useClickOutside<T extends HTMLElement>({
  handler,
  enabled = true,
}: UseClickOutsideOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handler, enabled]);

  return ref;
}
