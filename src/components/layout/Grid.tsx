import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GridCols = 1 | 2 | 3 | 4;

type GridProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  cols?: GridCols;
};

const colsClass: Record<GridCols, string> = {
  1: "grid grid-cols-1 gap-6",
  2: "grid grid-cols-1 gap-6 sm:grid-cols-2",
  3: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
};

export function Grid({ children, cols = 3, className, ...rest }: GridProps) {
  return (
    <div className={cn(colsClass[cols], className)} {...rest}>
      {children}
    </div>
  );
}
