import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container({ children, className, ...rest }: ContainerProps) {
  return (
    <div className={cn("container-site", className)} {...rest}>
      {children}
    </div>
  );
}
