import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { contactChannels } from "@/content/contact";

const contactLinkClassName =
  "text-inherit underline underline-offset-2 hover:text-evergreen focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]";

export function ContactInformationStatus() {
  return (
    <Section aria-labelledby="contact-channels-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="contact-channels-heading" level="h2" className="mb-4">
            {contactChannels.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{contactChannels.intro}</p>
        </div>

        <Grid cols={3}>
          {contactChannels.items.map((item) => (
            <Card key={item.title} as="article">
              <Heading level="h3" className="mb-2">
                {item.title}
              </Heading>
              {item.contacts ? (
                <ul className="flex flex-col gap-4">
                  {item.contacts.map((contact) => (
                    <li key={contact.href} className="text-body-sm">
                      <p className="mb-1">{contact.label}:</p>
                      <a
                        href={contact.href}
                        className={contactLinkClassName}
                        aria-label={contact.accessibilityLabel}
                      >
                        {contact.value}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : item.href && item.body ? (
                <a
                  href={item.href}
                  className={`text-body-sm whitespace-pre-line ${contactLinkClassName}`}
                  aria-label={item.accessibilityLabel}
                  {...(item.openInNewTab
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.body}
                </a>
              ) : (
                <p className="text-body-sm whitespace-pre-line">{item.body}</p>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
