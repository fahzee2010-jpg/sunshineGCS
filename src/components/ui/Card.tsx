import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  muted?: boolean;
  as?: "div" | "article" | "section" | "li";
};

export function Card({
  children,
  muted = false,
  as: Tag = "div",
  className,
  ...rest
}: CardProps) {
  return (
    <Tag className={cn(muted ? "card-muted" : "card", className)} {...rest}>
      {children}
    </Tag>
  );
}
