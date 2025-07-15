// "use client";

// import { useState } from "react";
// import { Avatar } from "../Avatar/Avatar.js";
// import type { AvatarSize } from "../../variables/variables.js";
// import { cn } from "../../lib/utils.js";

// interface AvatarGroupProps {
//   avatars: string[]; // Array of image sources
//   fallback?: string; // Single fallback for all avatars
//   size?: keyof typeof AvatarSize;
//   max?: number;
//   showTooltip?: boolean;
//   onAvatarClick?: (src: string, index: number) => void;
//   onMoreClick?: (hiddenAvatars: string[]) => void;
//   className?: string;
// }

// const AvatarGroup = ({
//   avatars,
//   fallback = "U", // Default fallback
//   size = "md",
//   max = 5,
//   showTooltip = false,
//   onAvatarClick,
//   onMoreClick,
//   className = "",
// }: AvatarGroupProps) => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const visibleAvatars = avatars.slice(0, max);
//   const hiddenAvatars = avatars.slice(max);
//   const hasMore = hiddenAvatars.length > 0;

//   const handleAvatarClick = (src: string, index: number) => {
//     if (onAvatarClick) {
//       onAvatarClick(src, index);
//     }
//   };

//   const handleMoreClick = () => {
//     if (onMoreClick) {
//       onMoreClick(hiddenAvatars);
//     }
//   };

//   const renderTooltip = (src: string, index: number) => {
//     if (!showTooltip || hoveredIndex !== index) return null;

//     return (
//       <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
//         {fallback} {index + 1}
//         <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
//       </div>
//     );
//   };

//   const renderMoreIndicator = () => {
//     if (!hasMore) return null;

//     return (
//       <div
//         className={`
//         relative
//         border-2
//         border-white
//         rounded-full
//         ${onMoreClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
//       `}
//         onClick={handleMoreClick}
//         onMouseEnter={() => setHoveredIndex(-1)}
//         onMouseLeave={() => setHoveredIndex(null)}
//       >
//         <div
//           className={`
//           ${size === "xs" ? "h-6 w-6 text-xs" : ""}
//           ${size === "sm" ? "h-8 w-8 text-xs" : ""}
//           ${size === "md" ? "h-12 w-12 text-sm" : ""}
//           ${size === "lg" ? "h-16 w-16 text-base" : ""}
//           ${size === "xl" ? "h-20 w-20 text-lg" : ""}
//           ${size === "2xl" ? "h-24 w-24 text-xl" : ""}
//           rounded-full
//           bg-gray-200
//           flex
//           items-center
//           justify-center
//           text-gray-600
//           font-semibold
//         `}
//         >
//           +{hiddenAvatars.length}
//         </div>
//         {showTooltip && hoveredIndex === -1 && (
//           <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
//             {hiddenAvatars.length} more
//             <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (avatars.length === 0) {
//     return null;
//   }

//   return (
//     <div className={cn("flex -space-x-2", className)}>
//       {visibleAvatars.map((src, index) => (
//         <div
//           key={index}
//           className="relative border-2 border-white rounded-full"
//           onMouseEnter={() => showTooltip && setHoveredIndex(index)}
//           onMouseLeave={() => showTooltip && setHoveredIndex(null)}
//         >
//           <Avatar
//             src={src}
//             fallback={fallback}
//             alt={`Avatar ${index + 1}`}
//             size={size}
//             className="!p-0"
//             onClick={
//               onAvatarClick ? () => handleAvatarClick(src, index) : undefined
//             }
//           />
//           {renderTooltip(src, index)}
//         </div>
//       ))}
//       {renderMoreIndicator()}
//     </div>
//   );
// };

// export { AvatarGroup };

"use client";
import { Avatar } from "../Avatar/Avatar.js";
import type { AvatarSize } from "../../variables/variables.js";
import { cn } from "../../lib/utils.js";

interface AvatarGroupProps {
  avatars: string[]; // Array of image sources
  fallback?: string; // Single fallback for all avatars
  size?: keyof typeof AvatarSize;
  max?: number;
  spacing?: "tighter" | "tight" | "normal" | "loose";
  onAvatarClick?: (src: string, index: number) => void;
  onMoreClick?: (hiddenAvatars: string[]) => void;
  className?: string;
}

const AvatarGroup = ({
  avatars,
  fallback = "A",
  size = "md",
  max = 5,
  spacing = "tight",
  onAvatarClick,
  onMoreClick,
  className = "",
}: AvatarGroupProps) => {
  const visibleAvatars = avatars.slice(0, max);
  const hiddenAvatars = avatars.slice(max);
  const hasMore = hiddenAvatars.length > 0;

  const handleAvatarClick = (src: string, index: number) => {
    if (onAvatarClick) {
      onAvatarClick(src, index);
    }
  };

  const handleMoreClick = () => {
    if (onMoreClick) {
      onMoreClick(hiddenAvatars);
    }
  };

  const getSpacingClasses = (): string => {
    const spacingMap = {
      tighter: "-space-x-4",
      tight: "-space-x-1",
      normal: "-space-x-2",
      loose: "-space-x-4",
    };
    return spacingMap[spacing];
  };

  const renderMoreIndicator = () => {
    if (!hasMore) return null;

    return (
      <div
        className={`
        relative
        border-2
        border-white
        rounded-full
        ${onMoreClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
      `}
        onClick={handleMoreClick}
      >
        <div
          className={`
          ${size === "xs" ? "h-6 w-6 text-xs" : ""}
          ${size === "sm" ? "h-8 w-8 text-xs" : ""}
          ${size === "md" ? "h-12 w-12 text-sm" : ""}
          ${size === "lg" ? "h-16 w-16 text-base" : ""}
          ${size === "xl" ? "h-20 w-20 text-lg" : ""}
          ${size === "2xl" ? "h-24 w-24 text-xl" : ""}
          rounded-full
          bg-gray-200
          flex
          items-center
          justify-center
          text-gray-600
          font-semibold
        `}
        >
          +{hiddenAvatars.length}
        </div>
      </div>
    );
  };

  if (avatars.length === 0) {
    return null;
  }

  return (
    <div className={cn(`flex ${getSpacingClasses()}`, className)}>
      {visibleAvatars.map((src, index) => (
        <div
          key={index}
          className="relative border-2 border-white rounded-full"
        >
          <Avatar
            src={src}
            fallback={fallback}
            alt={`Avatar ${index + 1}`}
            size={size}
            className="!p-0"
            onClick={
              onAvatarClick ? () => handleAvatarClick(src, index) : undefined
            }
          />
        </div>
      ))}
      {renderMoreIndicator()}
    </div>
  );
};

export { AvatarGroup };
