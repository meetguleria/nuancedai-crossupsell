import { useState } from 'react';
import { Page, Layout, Button, Card, Text} from '@shopify/polaris';
import { useAuthenticatedFetch } from "../hooks";
import { useTranslation } from "react-i18next";
import { TitleBar } from "@shopify/app-bridge-react";

export default function HomePage() {
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
        const response = await fetch('/api/shopify/fetch-and-save-products')
        const data = await response.json();
        console.log(data);
        setProducts(data);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleStartGuide = () => {
    console.log('Guide started!');
  };

  return (
    <>
      <Page narrowWidth>
        <TitleBar title={t("HomePage.title")} primaryAction={null} />
        <Layout>
          <Layout.Section>
          <Card sectioned>
              <Button>
                Helloo
              </Button>
        </Card>
          </Layout.Section>
          <Layout.Section>
          <Card sectioned>
            <Text spacing="loose">
             {t("HomePage.heading")}
              {t("HomePage.welcomeMessage")}
              <Button onClick={handleStartGuide}>{t("HomePage.startGuideButtonText")}</Button>
            </Text>
          </Card>
        </Layout.Section>
        <Layout.Section>
            <Card sectioned>
              <Button onClick={fetchProducts}>Fetch Products</Button>
            </Card>
        </Layout.Section>
        {loading && <p>Loading...</p>}
          <Layout.Section>
          {products.map((product) => (
              <Card key={product.id} title={product.title} sectioned>
                <Text>
                  <p>{product.title}</p>
                </Text>
              </Card>
            ))}
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
