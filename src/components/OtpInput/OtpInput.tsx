"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils.js";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  status?: "normal" | "success" | "error";
  normalClassName?: string;
  filledClassName?: string;
  successClassName?: string;
  errorClassName?: string;
  focusClassName?: string;
}

const OTPInput = ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  className,
  inputClassName,
  disabled = false,
  autoFocus = false,
  status = "normal",
  normalClassName = "border-gray-300",
  filledClassName = "border-gray-900",
  successClassName = "border-green-500",
  errorClassName = "border-red-500",
  focusClassName = "focus:ring-gray-900",
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(value.split("").slice(0, length));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setOtp(value.split("").slice(0, length));
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, val: string) => {
    if (disabled) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    const newOtpString = newOtp.join("");
    onChange?.(newOtpString);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "") && newOtp.length === length) {
      onComplete?.(newOtpString);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (disabled) return;
    switch (e.key) {
      case "Backspace":
        if (!otp[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowLeft":
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowRight":
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
        break;
      case "Delete":
        if (otp[index]) {
          const newOtp = [...otp];
          newOtp[index] = "";
          setOtp(newOtp);
          onChange?.(newOtp.join(""));
        }
        break;
      default:
        if (!/^\d$/.test(e.key) && e.key.length === 1) {
          e.preventDefault();
        }
        break;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    const newOtp = pastedData
      .split("")
      .concat(Array(length).fill(""))
      .slice(0, length);
    setOtp(newOtp);
    const newOtpString = newOtp.join("");
    onChange?.(newOtpString);

    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    if (newOtp.every((digit) => digit !== "") && newOtp.length === length) {
      onComplete?.(newOtpString);
    }
  };

  const getBorderColorClass = (index: number) => {
    switch (status) {
      case "success":
        return successClassName;
      case "error":
        return errorClassName;
      case "normal":
      default:
        return otp[index] ? filledClassName : normalClassName;
    }
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`OTP digit ${index + 1} of ${length}`}
          className={cn(
            "h-12 w-12 rounded-md border text-center text-lg font-medium",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            focusClassName,
            "disabled:cursor-not-allowed disabled:opacity-50",
            getBorderColorClass(index),
            inputClassName
          )}
        />
      ))}
    </div>
  );
};

OTPInput.displayName = "OTPInput";

export { OTPInput };
