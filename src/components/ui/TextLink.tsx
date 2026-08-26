import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  className?: string;
  /** Use for inline body/prose links (underlined). */
  inline?: boolean;
};

export function TextLink({
  children,
  className,
  inline = true,
  ...rest
}: TextLinkProps) {
  return (
    <Link
      className={cn(inline ? "prose-link" : "text-link hover:text-link-hover no-underline", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
