import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { volunteerGroups } from "@/content/volunteer";

export function CommunityGroupsAndTeams() {
  return (
    <Section aria-labelledby="community-groups-heading">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Heading id="community-groups-heading" level="h2" className="mb-4">
            {volunteerGroups.heading}
          </Heading>
          <p className="text-body-lg text-ink-muted">{volunteerGroups.intro}</p>
        </div>

        <Grid cols={3} className="mb-6">
          {volunteerGroups.audiences.map((audience) => (
            <Card key={audience} as="article" className="py-4">
              <p className="font-semibold text-evergreen">{audience}</p>
            </Card>
          ))}
        </Grid>

        <div className="max-w-3xl space-y-6">
          <p className="text-body-sm text-ink-muted">{volunteerGroups.note}</p>
          <Button href="/corporate-partners" variant="secondary">
            {volunteerGroups.corporateLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
