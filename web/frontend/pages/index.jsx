import { useCallback, useEffect } from 'react';
import { Page, Text, Button} from '@shopify/polaris';
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const fetch = useAuthenticatedFetch();

  // useEffect(() => {
    // fetch("/api/setup/initial-setup")
      // .then((response) => response.json())
      // .then((data) => console.log(data))
      // .catch((error) => console.log('Error fetching store details:', error));
  // }, [fetch]);

  const handleFetchDataClick = useCallback(() => {
    fetch("/api/stores/fetch-and-process-shop-data")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log('Error fetching store details:', error));
  }, [fetch]);
  return (
    <>
      <Page narrowWidth>
        <Text>Hello</Text>
        <Button onClick={handleFetchDataClick}>Sync Store Data</Button>
      </Page>
    </>
  );
}
