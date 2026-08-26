import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Radio({ label, className, id, ...rest }: RadioProps) {
  const inputId = id ?? `${rest.name}-${String(rest.value)}`;

  return (
    <label className={cn("form-check", className)} htmlFor={inputId}>
      <input
        id={inputId}
        type="radio"
        className="form-check-input rounded-full"
        {...rest}
      />
      <span className="text-body">{label}</span>
    </label>
  );
}
