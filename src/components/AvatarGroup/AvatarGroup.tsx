// "use client";

// import { useState } from "react";
// import { Avatar, AvatarProps } from "../Avatar/Avatar.js";


// interface AvatarGroupProps {
//   avatars: AvatarProps[];
//   size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
//   max?: number;
//   layout?: "stacked" | "grid" | "inline";
//   spacing?: "tight" | "normal" | "loose";
//   showTooltip?: boolean;
//   className?: string;
// }

// const AvatarGroup = ({
//   avatars,
//   size = "md",
//   max = 5,
//   layout = "stacked",
//   spacing = "normal",
//   showTooltip = false,
//   className = "",
// }: AvatarGroupProps) => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const visibleAvatars = avatars.slice(0, max);
//   const hiddenAvatars = avatars.slice(max);
//   const hasMore = hiddenAvatars.length > 0;

//   const getSpacingClasses = (): string => {
//     if (layout === "grid") return "";

//     const spacingMap = {
//       tight: "-space-x-1",
//       normal: "-space-x-2",
//       loose: "-space-x-1",
//     };
//     return spacingMap[spacing];
//   };

//   const getLayoutClasses = (): string => {
//     const layoutMap = {
//       stacked: `flex ${getSpacingClasses()}`,
//       grid: "grid grid-cols-4 gap-2",
//       inline: "flex space-x-2",
//     };
//     return layoutMap[layout];
//   };

//   const getZIndex = (index: number): string => {
//     if (layout === "stacked") {
//       return `z-${Math.max(10 - index, 0)}`;
//     }
//     return "";
//   };


//   const renderTooltip = (avatar: AvatarData, index: number) => {
//     if (!showTooltip || hoveredIndex !== index || !avatar.fullname) return null;

//     return (
//       <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
//         {avatar.fullname}
//         <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
//       </div>
//     );
//   };

//   const renderMoreIndicator = () => {
//     if (!hasMore) return null;

//     return (
//       <div
//         className={`
//           relative
//           ${getZIndex(visibleAvatars.length)}
//           ${onMoreClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
//         `}
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
//           border-2
//           border-white
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
//     <div className={`${getLayoutClasses()} ${className}`}>
//       {visibleAvatars.map((avatar, index) => (
//         <div
//           key={avatar.id || index}
//           className={`
//             relative
//             ${getZIndex(index)}
//             ${layout === "stacked" ? "border-2 border-white rounded-full" : ""}
//           `}
//           onMouseEnter={() => showTooltip && setHoveredIndex(index)}
//           onMouseLeave={() => showTooltip && setHoveredIndex(null)}
//         >
//           <Avatar
//             src={avatar.src}
//             fallback={avatar.fallback}
//             alt={avatar.alt}
//             size={size}
//             onClick={
//               onAvatarClick ? () => handleAvatarClick(avatar, index) : undefined
//             }
//           />
//           {renderTooltip(avatar, index)}
//         </div>
//       ))}
//       {renderMoreIndicator()}
//     </div>
//   );
// };

// export default AvatarGroup;
