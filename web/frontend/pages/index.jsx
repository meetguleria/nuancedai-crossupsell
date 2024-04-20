import { useCallback, useEffect } from 'react';
import { Page, Layout, Text} from '@shopify/polaris';
import { Flex, Card, Button } from '@radix-ui/themes';
import { useAuthenticatedFetch } from "../hooks";
import RadixProductCard from '../components/RadixProductCard';
import { CleanCard, MonoCard } from '../components/ModernMinimalCards';
import { SoftUICard, DepthCard } from '../components/NeumorphCards';

import '../index.css';
export default function HomePage() {
  const fetch = useAuthenticatedFetch();

  const handleFetchDataClick = useCallback(() => {
    fetch("/api/stores/fetch-and-process-shop-data")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log('Error fetching store details:', error));
  }, [fetch]);

  const handleCreateTestOrdersClick = useCallback(() => {
    fetch("/api/orders/create-test-orders")
      .then(response => response.json())
      .then(data => console.log('Test orders created:', data))
      .catch(error => console.log('Error creating test orders:', error));
  }, [fetch]);

  return (
    <Page fullWidth>
        <Card>
          <Text>
            <p>
              Enhance your store's shopping experience with AI-driven product recommendations. 
              Ready to start? Sync your store data now.
            </p>
          </Text>
          <div className="mt-4">
            <Button 
              onClick={handleFetchDataClick} 
              className="btn btn-error"
            >
              Sync Store Data
            </Button>
            <Button onClick={handleCreateTestOrdersClick}>
              Create Test Orders
            </Button>
          </div>
        </Card>
          <Layout.Section>
            <Flex align="center" gap="3">
              <Button className="custom-gradient-button">Primary Button</Button>
              <Button>Secondary Button</Button>
            </Flex>
          </Layout.Section>
          <Layout.Section>
            <RadixProductCard />
          </Layout.Section>
          <Layout.Section>
            <CleanCard>Simple and clean design.</CleanCard>
            <MonoCard>Monochrome minimalist card.</MonoCard>
          </Layout.Section>
          <Layout.Section>
            <SoftUICard>Soft Neumorph Design.</SoftUICard>
            <DepthCard>Monochrome card.</DepthCard>
          </Layout.Section>
    </Page>
  );
}
