import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionSize = "default" | "compact" | "large";

const sizeClass: Record<SectionSize, string> = {
  default: "section",
  compact: "section-compact",
  large: "section-large",
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  size?: SectionSize;
  as?: ElementType;
  tone?: "default" | "cream" | "surface";
};

const toneClass = {
  default: "",
  cream: "bg-sunshine-cream",
  surface: "bg-surface",
};

export function Section({
  children,
  size = "default",
  as: Tag = "section",
  tone = "default",
  className,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(sizeClass[size], toneClass[tone], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
