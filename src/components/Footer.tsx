import Link from "next/link";
import { footerGroups } from "@/content/navigation";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";
import { Container } from "@/components/layout/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto">
      <Container className="py-10 sm:py-12">
        <div className="mb-10 max-w-xl">
          <p className="text-lg font-bold text-white">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-sunshine-gold">{SITE_TAGLINE}</p>
          <p className="mt-4 text-sm text-white/80">
            Sunshine Global Community Services is recognized by the IRS as an
            Illinois 501(c)(3) public charity. Additional transparency materials
            will be published when available.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 text-xs font-semibold tracking-wider text-sunshine-gold uppercase">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/85 no-underline hover:text-sunshine-gold hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-white/15 pt-6 text-sm text-white/70">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
