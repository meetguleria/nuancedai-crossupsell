import { useEffect } from 'react';
import { Page, Text} from '@shopify/polaris';
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    fetch("/api/stores/store")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log('Error fetching store details:', error));
  }, [fetch]);

  return (
    <>
      <Page narrowWidth>
        <Text>Hello</Text>
      </Page>
    </>
  );
}
