import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Checkbox({ label, className, id, ...rest }: CheckboxProps) {
  const inputId = id ?? rest.name;

  return (
    <label className={cn("form-check", className)} htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        className="form-check-input"
        {...rest}
      />
      <span className="text-body">{label}</span>
    </label>
  );
}
