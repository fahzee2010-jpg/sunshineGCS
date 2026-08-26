import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost",
};

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className } = props;
  const classes = cn(variantClass[variant], className);

  if (props.href) {
    const rest = { ...props } as ButtonAsLink;
    delete (rest as { variant?: ButtonVariant }).variant;
    delete (rest as { className?: string }).className;
    delete (rest as { children?: ReactNode }).children;
    const { href, ...linkProps } = rest;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const rest = { ...props } as ButtonAsButton;
  delete (rest as { variant?: ButtonVariant }).variant;
  delete (rest as { className?: string }).className;
  delete (rest as { children?: ReactNode }).children;
  const { type = "button", ...buttonProps } = rest;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
