"use client";

import { useEffect, useState } from "react";
import { AvatarSize } from "../../variables/variables.js";
import { cn } from "../../lib/utils.js";

export interface AvatarProps {
  src?: string;
  onClick?: () => void;
  fallback?: string;
  alt?: string;
  size?: keyof typeof AvatarSize;
  className?: string;
}

const Avatar = ({
  src,
  onClick,
  fallback,
  alt,
  size = "md",
  className = "",
}: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(src || null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImgSrc(src || null);
    setImageError(false);
  }, [src]);

  const getInitials = (name?: string): string => {
    if (!name) return "A";

    const names = name
      .trim()
      .split(" ")
      .filter((n) => n.length > 0);

    if (names.length === 0) return "A";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const handleImageError = () => {
    setImgSrc(null);
    setImageError(true);
  };

  return (
    <div
      className={cn(
        AvatarSize[size],
        "rounded-full overflow-hidden group flex items-center justify-center relative m-1",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : "img"}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div
        className={`w-full h-full rounded-full absolute z-10 top-0 left-0 bg-black/0 transition-colors ${
          onClick ? "cursor-pointer group-hover:bg-black/20" : ""
        }`}
      ></div>

      {imgSrc && !imageError ? (
        <img
          src={imgSrc}
          alt={alt || fallback || "Avatar"}
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
          {getInitials(fallback)}
        </div>
      )}
    </div>
  );
};

export { Avatar };
