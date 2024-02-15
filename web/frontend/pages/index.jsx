import { useState, useEffect } from 'react';
import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  Button,
} from "@shopify/polaris";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useTranslation } from "react-i18next";
import { TitleBar } from "@shopify/app-bridge-react";

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [toastProps, setToastProps] = useState({ content: null });
    const [recommendations, setRecommendations] = useState([]);
    const fetch = useAuthenticatedFetch();
    const { t } = useTranslation();

    const { data: products, refetch: refetchProducts, isLoading: isLoadingProducts } = useAppQuery({
        url: "/api/products",
        reactQueryOptions: {
            onSuccess: () => setIsLoading(false),
            onError: () => {
                setToastProps({
                    content: t("HomePage.errorFetchingProducts"),
                    error: true,
                });
                setIsLoading(false);
            },
        },
    });

    const fetchRecommendations = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/recommendations');
            if (!response.ok) throw new Error('Network response was not ok');
            const recommendations = await response.json();
            console.log(recommendations);
            setRecommendations(recommendations);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
            setIsLoading(false);
            setToastProps({
                content: t("HomePage.errorFetchingRecommendations"),
                error: true,        
            });
        }
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
        await refetchProducts();
        setToastProps({
            content: t("HomePage.productsFetchedSuccess"),
        });
    } catch (error) {
        console.error('Failed to fetch products:', error);
        setIsLoading(false);
        setToastProps({
            content: t("HomePage.errorFetchingProducts"),        
            error: true,
        });
    }
  };

  useEffect(() => {
    fetchRecommendations();
    }, []);
  
  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps({ content: null })} />
  );

  return (
<>
      {toastMarkup}
      <Page narrowWidth>
        <TitleBar title={t("HomePage.title")} primaryAction={null} />
        <Layout>
          <Layout.Section>
            <Card title={t("HomePage.productsTitle")} sectioned>
                <Button onClick={fetchRecommendations} loading={isLoading}>
                    {t("HomePage.fetchRecommendationsButton")}
                </Button>
            </Card>
            <Card title={t("HomePage.recommendationsTitle")} sectioned>
                {recommendations.map((recommendation, index) => (
                    <Text key={index}>{recommendation.title}</Text>
                ))}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
