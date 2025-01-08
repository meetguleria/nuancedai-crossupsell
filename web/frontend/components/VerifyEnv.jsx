import { Text } from '@shopify/polaris';

const VerifyEnv = () => {
  return (
    <Text>
      Shopify API Key: {import.meta.env.VITE_SHOPIFY_API_KEY || 'Not Found'}
    </Text>
  );
};

export default VerifyEnv;