import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Radio } from "@/components/ui/Radio";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { TextLink } from "@/components/ui/TextLink";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Internal design-system preview for Sunshine Global Community Services. Not a public marketing page.",
  robots: {
    index: false,
    follow: false,
  },
};

const colors = [
  { name: "Sunshine Gold", token: "--color-sunshine-gold", value: "#F4B942", swatch: "bg-sunshine-gold", text: "text-charcoal" },
  { name: "Deep Evergreen", token: "--color-evergreen", value: "#174A3A", swatch: "bg-evergreen", text: "text-white" },
  { name: "Community Green", token: "--color-community-green", value: "#2F6B57", swatch: "bg-community-green", text: "text-white" },
  { name: "Sunshine Cream", token: "--color-sunshine-cream", value: "#FFF8E8", swatch: "bg-sunshine-cream", text: "text-charcoal" },
  { name: "Warm White", token: "--color-warm-white", value: "#FFFCF7", swatch: "bg-warm-white", text: "text-charcoal" },
  { name: "Charcoal", token: "--color-charcoal", value: "#1F2933", swatch: "bg-charcoal", text: "text-white" },
  { name: "Warm Gray", token: "--color-warm-gray", value: "#667085", swatch: "bg-warm-gray", text: "text-white" },
  { name: "Soft Gray", token: "--color-soft-gray", value: "#E5E7EB", swatch: "bg-soft-gray", text: "text-charcoal" },
];

export default function DesignSystemPage() {
  return (
    <>
      <Section size="compact" tone="cream">
        <Container>
          <Badge tone="gold">Internal preview</Badge>
          <Heading level="display" className="mt-4 mb-3">
            Design system
          </Heading>
          <p className="text-body-lg max-w-3xl text-ink-muted">
            Visual foundation for {SITE_NAME}. This page is for Project Manager
            and developer review. It is not a public marketing page and is set
            to <code className="text-sm">noindex</code>.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level="h2" className="mb-2">
            Colors
          </Heading>
          <p className="text-body-sm mb-6 max-w-2xl">
            Gold is reserved for accents and high-emphasis highlights. Primary
            CTAs use evergreen or community green for accessible contrast.
          </p>
          <Grid cols={4}>
            {colors.map((color) => (
              <Card key={color.name} className="overflow-hidden p-0 sm:p-0">
                <div
                  className={`flex h-24 items-end p-3 ${color.swatch} ${color.text}`}
                >
                  <span className="text-sm font-semibold">{color.name}</span>
                </div>
                <div className="p-4">
                  <p className="text-body-sm font-medium text-charcoal">
                    {color.value}
                  </p>
                  <p className="text-caption mt-1">{color.token}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <Heading level="h2" className="mb-6">
            Typography
          </Heading>
          <div className="space-y-5">
            <div>
              <p className="text-caption mb-1">Display</p>
              <p className="text-display">From Surplus to Service.</p>
            </div>
            <div>
              <p className="text-caption mb-1">Heading 1</p>
              <h1 className="text-h1">Community support starts here</h1>
            </div>
            <div>
              <p className="text-caption mb-1">Heading 2</p>
              <h2 className="text-h2">Programs and partnerships</h2>
            </div>
            <div>
              <p className="text-caption mb-1">Heading 3</p>
              <h3 className="text-h3">How surplus becomes service</h3>
            </div>
            <div>
              <p className="text-caption mb-1">Heading 4</p>
              <h4 className="text-h4">Volunteer opportunities</h4>
            </div>
            <div>
              <p className="text-caption mb-1">Body large</p>
              <p className="text-body-lg max-w-2xl">
                Readable lead text for section introductions. Comfortable line
                height and strong contrast on warm backgrounds.
              </p>
            </div>
            <div>
              <p className="text-caption mb-1">Body</p>
              <p className="text-body max-w-2xl">
                Standard body copy for page content. Designed for long-form
                readability on mobile and desktop.
              </p>
            </div>
            <div>
              <p className="text-caption mb-1">Body small / Caption</p>
              <p className="text-body-sm">Supporting details and helper text.</p>
              <p className="text-caption mt-1">Caption / metadata label</p>
            </div>
            <div>
              <p className="text-caption mb-1">Inline link</p>
              <p className="text-body">
                Learn more on the{" "}
                <TextLink href="/about">About</TextLink> page when content is
                ready.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level="h2" className="mb-6">
            Buttons
          </Heading>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Donate Goods</Button>
            <Button variant="secondary">Get Assistance</Button>
            <Button variant="outline">Learn more</Button>
            <Button variant="ghost">Text action</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <p className="text-body-sm mt-4">
            States covered: default, hover, focus-visible, active, disabled.
            Minimum touch target height is 44px.
          </p>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <Heading level="h2" className="mb-6">
            Cards & badges
          </Heading>
          <Grid cols={3}>
            <Card>
              <Badge tone="gold">Accent</Badge>
              <Heading level="h3" className="mt-3 mb-2">
                Program card
              </Heading>
              <p className="text-body-sm">
                Simple bordered surface for future program summaries.
              </p>
            </Card>
            <Card muted>
              <Badge tone="green">Support</Badge>
              <Heading level="h3" className="mt-3 mb-2">
                Soft card
              </Heading>
              <p className="text-body-sm">
                Cream background for quieter grouping without heavy shadows.
              </p>
            </Card>
            <Card>
              <Badge tone="muted">Status</Badge>
              <Heading level="h3" className="mt-3 mb-2">
                Impact card
              </Heading>
              <p className="text-body-sm">
                Placeholder for verified metrics only — no invented numbers.
              </p>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level="h2" className="mb-6">
            Form controls
          </Heading>
          <p className="text-body-sm mb-6 max-w-2xl">
            Visual styles only. Not connected to a backend. Error messaging uses
            text plus color.
          </p>
          <div className="grid max-w-2xl gap-5">
            <FormField id="demo-name" label="Full name" helpText="As it should appear on records.">
              <Input id="demo-name" name="demo-name" placeholder="Placeholder name" />
            </FormField>
            <FormField id="demo-email" label="Email" error="Enter a valid email address.">
              <Input
                id="demo-email"
                name="demo-email"
                type="email"
                defaultValue="not-an-email"
                aria-invalid="true"
                aria-describedby="demo-email-error"
              />
            </FormField>
            <FormField id="demo-type" label="Request type" success="Looks good.">
              <Select id="demo-type" name="demo-type" defaultValue="goods">
                <option value="goods">Donate goods</option>
                <option value="volunteer">Volunteer</option>
                <option value="assistance">Get assistance</option>
              </Select>
            </FormField>
            <FormField id="demo-message" label="Message">
              <Textarea id="demo-message" name="demo-message" placeholder="Short message placeholder" />
            </FormField>
            <Checkbox name="demo-consent" label="I understand this is a visual demo only." />
            <fieldset className="space-y-2">
              <legend className="form-label">Preferred contact</legend>
              <Radio name="demo-contact" value="email" label="Email" defaultChecked />
              <Radio name="demo-contact" value="phone" label="Phone" />
            </fieldset>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <Heading level="h2" className="mb-6">
            Alerts & status
          </Heading>
          <div className="grid max-w-2xl gap-4">
            <Alert tone="info" title="Information">
              Neutral guidance for upcoming form or process steps.
            </Alert>
            <Alert tone="success" title="Success">
              Confirmation messaging uses text and a success style, not color alone.
            </Alert>
            <Alert tone="error" title="Error" role="alert">
              Error messaging remains readable and is announced to assistive technology.
            </Alert>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level="h2" className="mb-2">
            Media placeholder
          </Heading>
          <p className="text-body-sm mb-6 max-w-2xl">
            Layout support for future authentic photography. No stock images in
            this phase.
          </p>
          <Grid cols={2}>
            <MediaPlaceholder label="Warehouse / sorting photography placeholder" />
            <MediaPlaceholder label="Volunteer / distribution photography placeholder" />
          </Grid>
        </Container>
      </Section>

      <Section tone="cream" size="compact">
        <Container>
          <Heading level="h2" className="mb-2">
            Spacing & layout notes
          </Heading>
          <ul className="text-body max-w-3xl list-disc space-y-2 pl-5">
            <li>Container max width: 72rem with responsive horizontal padding.</li>
            <li>Section sizes: compact, default, and large vertical rhythm.</li>
            <li>Grid patterns: 1 → 2 → 3/4 columns across breakpoints.</li>
            <li>Tested intent: usable from 320px upward without horizontal scroll.</li>
            <li>Motion: none required; reduced-motion preferences are respected globally.</li>
          </ul>
        </Container>
      </Section>
    </>
  );
}
