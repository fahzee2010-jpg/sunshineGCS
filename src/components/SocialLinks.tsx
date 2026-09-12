import { getSocialLinks, type SocialLinkItem } from "@/content/social";

function SocialIcon({ id }: { id: SocialLinkItem["id"] }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 20,
    height: 20,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (id) {
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.41c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.12.18 2.12.18v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.9h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="currentColor">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm10.13 1.38a1.12 1.12 0 1 1 0 2.25 1.12 1.12 0 0 1 0-2.25zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.43-9.91 9.88 0 1.74.46 3.44 1.34 4.94L2 22l5.34-1.4a9.9 9.9 0 0 0 4.7 1.2h.01c5.46 0 9.91-4.43 9.91-9.88C21.96 6.43 17.5 2 12.04 2zm5.78 14.05c-.24.68-1.4 1.25-1.95 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.29.37-.41.5-.14.14-.28.29-.12.56.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.21 2.17 1.35.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.09 1.55.73 1.81.86.27.14.44.2.51.31.07.11.07.64-.17 1.32z" />
        </svg>
      );
  }
}

export function SocialLinks() {
  const links = getSocialLinks();

  if (links.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Social media and messaging" className="social-links">
      <ul className="social-links-list">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
            >
              <SocialIcon id={link.id} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
