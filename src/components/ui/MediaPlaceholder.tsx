import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MediaPlaceholderProps = HTMLAttributes<HTMLElement> & {
  label?: string;
  /** Optional overlay title shown above the direction note. */
  title?: string;
  /** Visual density for hero vs supporting placements. */
  size?: "default" | "hero";
  children?: ReactNode;
};

/**
 * Production-ready stand-in for future authentic photography.
 * Structured so real images can replace the frame without redesigning sections.
 */
export function MediaPlaceholder({
  label = "Authentic program photography will appear here.",
  title,
  size = "default",
  className,
  children,
  ...rest
}: MediaPlaceholderProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-lg border border-border",
        size === "hero" ? "min-h-[18rem] sm:min-h-[22rem] lg:min-h-[26rem]" : "aspect-[16/10]",
        className,
      )}
      {...rest}
    >
      <div
        className="absolute inset-0 bg-evergreen"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--color-evergreen) 88%, black) 0%, var(--color-community-green) 48%, color-mix(in srgb, var(--color-sunshine-gold) 55%, var(--color-evergreen)) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0.9px, transparent 1.2px), radial-gradient(circle at 80% 40%, white 0.8px, transparent 1.1px)",
          backgroundSize: "28px 28px, 36px 36px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full bg-sunshine-gold/25 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-6 left-6 h-24 w-24 rounded-full border border-white/20"
        aria-hidden="true"
      />
      <figcaption className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-5 sm:p-7">
        <div className="max-w-md rounded-md border border-white/20 bg-evergreen/55 p-4 backdrop-blur-[2px] sm:p-5">
          {title ? (
            <p className="mb-2 text-sm font-semibold tracking-wide text-sunshine-gold uppercase">
              {title}
            </p>
          ) : null}
          <p className="text-sm leading-relaxed text-white/95 sm:text-base">
            {label}
          </p>
          {children}
        </div>
      </figcaption>
    </figure>
  );
}
