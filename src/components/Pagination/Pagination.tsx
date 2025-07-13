"use client";

import { cn } from "../../lib/utils.js";
import { usePagination } from "../../hooks/use-pagination.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../Button/Button.js";

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  containerClassName?: string;
  ButtonClassName?: string;
  activeButtonClassName?: string;
  ellipsisClassName?: string;
  disabledButtonClassName?: string;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
  containerClassName,
  ButtonClassName,
  activeButtonClassName,
  ellipsisClassName,
  disabledButtonClassName,
}: PaginationProps) {
  const { paginationRange, hasNextPage, hasPreviousPage } = usePagination({
    totalItems,
    itemsPerPage,
    currentPage,
    siblingCount,
  });

  if (!paginationRange || paginationRange.length < 2) {
    return null;
  }

  const defaultButtonClasses =
    "flex items-center justify-center h-8 w-8 rounded border text-sm transition-colors duration-200";
  const defaultDisabledClasses =
    "opacity-50 cursor-not-allowed hover:bg-transparent focus:ring-0";
  const defaultActiveClasses = "bg-gray-900 text-white hover:bg-gray-800";
  const defaultEllipsisClasses = "px-2 py-1 text-gray-500";

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn(
        "flex items-center justify-center space-x-1",
        containerClassName,
      )}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className={cn(
          defaultButtonClasses,
          "hover:bg-gray-50 focus:outline-none ",
          ButtonClassName,
          !hasPreviousPage &&
            cn(defaultDisabledClasses, disabledButtonClassName)
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <span
              key={index}
              className={cn(defaultEllipsisClasses, ellipsisClassName)}
            >
              ...
            </span>
          );
        }
        const isActive = pageNumber === currentPage;
        return (
          <Button
            key={index}
            onClick={() => onPageChange(pageNumber as number)}
            className={cn(
              defaultButtonClasses,
              "hover:bg-gray-50 focus:outline-none ",
              ButtonClassName,
              isActive && cn(defaultActiveClasses, activeButtonClassName)
            )}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={cn(
          defaultButtonClasses,
          "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900",
          ButtonClassName,
          !hasNextPage && cn(defaultDisabledClasses, disabledButtonClassName)
        )}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
