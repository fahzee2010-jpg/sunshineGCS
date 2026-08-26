import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "display" | "h1" | "h2" | "h3" | "h4";

const levelClass: Record<HeadingLevel, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

const defaultTag: Record<HeadingLevel, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  as?: ElementType;
  children: ReactNode;
};

export function Heading({
  level = "h2",
  as,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = as ?? defaultTag[level];

  return (
    <Tag className={cn(levelClass[level], className)} {...rest}>
      {children}
    </Tag>
  );
}
