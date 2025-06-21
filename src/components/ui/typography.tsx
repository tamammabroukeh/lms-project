import * as React from "react";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      h5: "text-lg font-semibold tracking-tight",
      h6: "text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      ol: "my-6 ml-6 list-decimal [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm",
      error: "text-sm font-medium",
      success: "text-sm font-medium",
      link: "font-medium underline underline-offset-4",
      caption: "text-xs",
      overline: "text-xs uppercase tracking-wider",
      kbd: "rounded border bg-muted px-1.5 py-0.5 font-mono text-[0.625rem] font-semibold shadow-sm",
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    tracking: {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
    },
    leading: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
    decoration: {
      underline: "underline",
      lineThrough: "line-through",
      noUnderline: "no-underline",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      normalCase: "normal-case",
    },
    wrap: {
      normal: "whitespace-normal",
      nowrap: "whitespace-nowrap",
      pre: "whitespace-pre",
      preLine: "whitespace-pre-line",
      preWrap: "whitespace-pre-wrap",
      break: "break-words",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning",
      info: "text-info",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      foreground: "text-foreground",
      background: "text-background",
      card: "text-card-foreground",
      popover: "text-popover-foreground",
      border: "text-border",
      input: "text-input",
      ring: "text-ring",
      inherit: "text-inherit",
      current: "text-current",
      white: "text-white",
      black: "text-black",
    },
    bgColor: {
      none: "",
      default: "bg-background",
      primary: "bg-primary",
      secondary: "bg-secondary",
      destructive: "bg-destructive",
      success: "bg-success",
      warning: "bg-warning",
      info: "bg-info",
      muted: "bg-muted",
      accent: "bg-accent",
      foreground: "bg-foreground",
      card: "bg-card",
      popover: "bg-popover",
      border: "bg-border",
      input: "bg-input",
      ring: "bg-ring",
      inherit: "bg-inherit",
      transparent: "bg-transparent",
    },
    bgOpacity: {
      0: "bg-opacity-0",
      5: "bg-opacity-5",
      10: "bg-opacity-10",
      20: "bg-opacity-20",
      25: "bg-opacity-25",
      30: "bg-opacity-30",
      40: "bg-opacity-40",
      50: "bg-opacity-50",
      60: "bg-opacity-60",
      70: "bg-opacity-70",
      75: "bg-opacity-75",
      80: "bg-opacity-80",
      90: "bg-opacity-90",
      95: "bg-opacity-95",
      100: "bg-opacity-100",
    },
  },
  compoundVariants: [
    // Heading variants
    {
      variant: ["h1", "h2", "h3", "h4", "h5", "h6"],
      weight: "bold",
      className: "font-heading",
    },
    // Code elements
    {
      variant: ["inlineCode", "kbd"],
      className: "font-mono",
    },
    // Special variants with default colors
    {
      variant: "muted",
      color: "muted",
      className: "text-sm",
    },
    {
      variant: "error",
      color: "destructive",
      className: "text-sm font-medium",
    },
    {
      variant: "success",
      color: "success",
      className: "text-sm font-medium",
    },
    {
      variant: "link",
      color: "primary",
      className: "hover:text-primary/80 cursor-pointer",
    },
  ],
  defaultVariants: {
    variant: "p",
    weight: "normal",
    align: "left",
    tracking: "normal",
    leading: "normal",
    wrap: "normal",
    color: "default",
    bgColor: "none",
    bgOpacity: 100,
  },
});

type TypographyTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "strong"
  | "em"
  | "blockquote"
  | "ul"
  | "ol"
  | "li"
  | "code"
  | "pre"
  | "label"
  | "a"
  | "small"
  | "time"
  | "cite"
  | "q"
  | "dt"
  | "dd"
  | "figcaption"
  | "caption"
  | "kbd"
  | "mark"
  | "samp"
  | "var";

type TypographyProps = VariantProps<typeof typographyVariants> & {
  as?: TypographyTag;
  asChild?: boolean;
  truncate?: boolean;
  gradient?: boolean | string;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "color">;

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      weight,
      align,
      tracking,
      leading,
      decoration,
      transform,
      wrap,
      color,
      bgColor,
      bgOpacity,
      as,
      asChild = false,
      truncate = false,
      gradient = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild
      ? Slot
      : as ||
        (variant?.startsWith("h")
          ? (variant as TypographyTag)
          : variant === "inlineCode"
          ? "code"
          : variant === "ul"
          ? "ul"
          : variant === "ol"
          ? "ol"
          : variant === "kbd"
          ? "kbd"
          : "div");

    const baseClasses = typographyVariants({
      variant,
      weight,
      align,
      tracking,
      leading,
      decoration,
      transform,
      wrap,
      color,
      bgColor,
      bgOpacity,
    });

    const gradientClass =
      typeof gradient === "string"
        ? gradient
        : "bg-gradient-to-r from-primary to-secondary";

    const classes = cn(
      baseClasses,
      {
        truncate: truncate,
        "bg-clip-text text-transparent": gradient,
      },
      gradient ? gradientClass : null,
      className
    );

    const refProp = asChild
      ? { ref: ref as React.Ref<HTMLElement> }
      : { ref: ref as React.Ref<HTMLElement> };

    const elementProps = {
      ...props,
      className: classes,
      ...refProp,
    };

    if (asChild) {
      return <Slot {...(elementProps as SlotProps)}>{props.children}</Slot>;
    }

    return <Comp {...(elementProps as React.HTMLAttributes<HTMLElement>)} />;
  }
);

Typography.displayName = "Typography";

export { Typography };
