import { useId as useReactId } from "react";

export function useId(prefix?: string) {
  const id = useReactId();
  return prefix ? `${prefix}-${id}` : id;
}
