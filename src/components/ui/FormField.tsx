import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  helpText?: string;
  error?: string;
  success?: string;
  required?: boolean;
  className?: string;
};

export function FormField({
  id,
  label,
  children,
  helpText,
  error,
  success,
  required,
  className,
}: FormFieldProps) {
  const helpId = helpText ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const successId = success ? `${id}-success` : undefined;

  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={id} className="form-label">
        {label}
        {required ? (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {helpText && !error ? (
        <p id={helpId} className="form-help">
          {helpText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      {success && !error ? (
        <p id={successId} className="form-success" role="status">
          {success}
        </p>
      ) : null}
    </div>
  );
}
