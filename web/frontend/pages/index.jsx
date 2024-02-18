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
import { Toast } from '@shopify/polaris';
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
        const urlParams = new URLSearchParams(window.location.search);
        const shop = urlParams.get('shop');
        const host = urlParams.get('host');
        if (!shop || !host) {
            console.error('Shop or host parameter is missing');
            setIsLoading(false);
            return;
        }
        const url = `/api/recommendations?shop=${shop}&host=${host}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const recommendations = await response.json();
            setRecommendations(recommendations);
    
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
            setToastProps({
                content: t("HomePage.errorFetchingRecommendations"),
                error: true,        
            });
        } finally {
            setIsLoading(false);
        }
    };

  useEffect(() => {
    fetchAndSaveData();
    fetchRecommendations();
  }, []);

    const fetchAndSaveData = async () => {
      const url = '/api/test-fetch-save';
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        console.log("Data fetch and save initiated successfully");
      } catch (error) {
        console.error('Failed to initiate data fetch and save:', error);
      }
    };
  
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
