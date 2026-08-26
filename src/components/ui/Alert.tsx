import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type AlertTone = "info" | "success" | "error";

const toneClass: Record<AlertTone, string> = {
  info: "alert alert-info",
  success: "alert alert-success",
  error: "alert alert-error",
};

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: AlertTone;
  title?: string;
};

export function Alert({
  children,
  tone = "info",
  title,
  className,
  role = "status",
  ...rest
}: AlertProps) {
  return (
    <div
      className={cn(toneClass[tone], className)}
      role={role}
      {...rest}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}
