import { Card, EmptyState, Page } from "@shopify/polaris";
import { notFoundImage } from "../assets";

export default function NotFound() {
  return (
    <Page>
      <Card>
        <Card.Section>
          <EmptyState heading="Page Not Found" image={notFoundImage}>
            <p>The page you are looking for does not exist.</p>
          </EmptyState>
        </Card.Section>
      </Card>
    </Page>
  );
}
