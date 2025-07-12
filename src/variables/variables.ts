interface SizeVariables {
  "2xl": string;
  "3xl": string;
  md: string;
  lg: string;
  xl: string;
}

export const SizeVariables: SizeVariables = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};


interface AvatarSize {
  "2xl": string;
  md: string;
  lg: string;
  xl: string;
  xs: string;
  sm: string;
}

export const AvatarSize: AvatarSize = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-lg",
  xl: "h-20 w-20 text-xl",
  "2xl": "h-24 w-24 text-2xl",
};
