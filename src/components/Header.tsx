"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import {
  mobileNav,
  primaryActions,
  secondaryNav,
} from "@/content/navigation";
import { SITE_NAME } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container-site flex items-center justify-between gap-4 py-3 lg:py-4">
        <Link
          href="/"
          className="max-w-[11rem] text-base font-bold text-white no-underline hover:text-sunshine-gold sm:max-w-[16rem] sm:text-lg"
          onClick={closeMenu}
        >
          {SITE_NAME}
        </Link>

        <button
          type="button"
          className="btn btn-outline border-white/70 text-white hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
        </button>

        <div className="hidden min-w-0 items-center gap-5 xl:gap-6 lg:flex">
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {secondaryNav.map((item) => {
                const isCurrent = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-nav no-underline",
                        isCurrent
                          ? "font-semibold text-sunshine-gold"
                          : "text-white/85 hover:text-sunshine-gold",
                      )}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav aria-label="Priority actions">
            <ul className="flex flex-wrap items-center gap-2">
              {primaryActions.map((item) => {
                const isCurrent = pathname === item.href;
                const isLead = item.href === "/donate-goods";
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "btn text-btn",
                        isLead
                          ? "bg-sunshine-gold text-charcoal hover:bg-[#e5ab35]"
                          : "border border-white/50 bg-transparent text-white hover:bg-white/10",
                        isCurrent &&
                          "ring-2 ring-sunshine-gold ring-offset-2 ring-offset-evergreen",
                      )}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div
        id={menuId}
        className={cn(
          "border-t border-white/15 lg:hidden",
          open ? "block" : "hidden",
        )}
        hidden={!open}
      >
        <nav aria-label="Mobile" className="container-site py-4">
          <ul className="flex flex-col gap-1">
            {mobileNav.map((item) => {
              const isCurrent = pathname === item.href;
              const isAction = primaryActions.some(
                (action) => action.href === item.href,
              );
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-3 text-base no-underline",
                      isAction ? "font-semibold" : "font-medium",
                      isCurrent
                        ? "bg-sunshine-gold text-charcoal"
                        : "text-white hover:bg-white/10",
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 border-t border-white/15 pt-4">
            <Button
              href="/donate-goods"
              variant="primary"
              className="w-full bg-sunshine-gold text-charcoal hover:bg-[#e5ab35]"
              onClick={closeMenu}
            >
              Donate Goods
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
