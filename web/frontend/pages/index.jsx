import { useCallback, useEffect } from 'react';
import { Page, Card, Layout, Text, Button} from '@shopify/polaris';
import { useAuthenticatedFetch } from "../hooks";

import '../index.css';
export default function HomePage() {
  const fetch = useAuthenticatedFetch();

  const handleFetchDataClick = useCallback(() => {
    fetch("/api/stores/fetch-and-process-shop-data")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log('Error fetching store details:', error));
  }, [fetch]);
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
        <Card sectioned title="Welcome to NuancedAI - Product Recommendations">
          <Text>
              Enhance your store's shopping experience with AI-driven product recommendations.
              Ready to start? Sync your store data now.
          </Text>
          <div className="mt-4">
            <Button
              onClick={handleFetchDataClick}
              className="btn btn-error"
            >
              Sync Store Data
            </Button>
          </div>
        </Card>
          </Layout.Section>
          <Layout.Section>
              <Button className="custom-gradient-button">Primary Button</Button>
              <Button>Secondary Button</Button>
          </Layout.Section>
        </Layout>
    </Page>
  );
}
