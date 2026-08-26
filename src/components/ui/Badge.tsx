import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "gold" | "green" | "muted";

const toneClass: Record<BadgeTone, string> = {
  gold: "badge badge-gold",
  green: "badge badge-green",
  muted: "badge badge-muted",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

export function Badge({
  children,
  tone = "muted",
  className,
  ...rest
}: BadgeProps) {
  return (
    <span className={cn(toneClass[tone], className)} {...rest}>
      {children}
    </span>
  );
}
