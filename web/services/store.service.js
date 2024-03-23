import Store from '../models/store.model.js';
import shopify from '../shopify.js';

const GET_SHOP_DETAILS_QUERY = `
query {
  shop {
    name
    primaryDomain {
      url
      host
    }
  }
}`;

export const fetchShopifyShopDetails = async (session) => {
  try {
    const client = new shopify.api.clients.Graphql({ session });
    
    const response = await client.request(GET_SHOP_DETAILS_QUERY, {
      variables: {},
    });

    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      throw new Error('GraphQL query failed');
    } else if (response.data && response.data.shop) {
      console.log('Shop Details Data:', response.data.shop);
      console.log('Shop Name:', response.data.shop.name);
      return response.data.shop;
    } else {
      console.log('Unexpected GraphQL response structure:', response);
      throw new Error('Unexpected GraphQL response structure');
    }
  } catch (error) {
    console.error('Error fetching shop details:', error);
    throw error;
  }
};

export const processAndSaveShopDetails = async (session) => {
  const shopDetails = await fetchShopifyShopDetails(session);

  const [store, created] = await Store.findOrCreate({
    where: { shopify_domain: shopDetails.myshopifyDomain },
    defaults: {
      shopify_store_id: shopDetails.id,
      shopify_domain: shopDetails.myshopifyDomain,
      shopify_store_email: shopDetails.email,
      primary_domain_url: shopDetails.primaryDomain.url,
      shopify_currency_code: shopDetails.currencyCode,
      shopify_store_timezone: shopDetails.timezone,
    }
  });

  if (!created) {
    await store.update({
      shopify_store_id: shopDetails.id,
      primary_domain_url: shopDetails.primaryDomain.url,
      shopify_store_email: shopDetails.email,
    });
    console.log('Store updated with new shop details.');
  } else {
    console.log('New store created with shop details.');
  }
  return store;
};

export async function linkUserWithStore(shopifyStoreId, userId) {
  try {
    const store = await Store.findOne({ where: { shopify_store_id: shopifyStoreId } });

    if (store) {
      await store.update({ userId });
      console.log(`Store ${shopifyStoreId} linked to user ${userId} successfully.`);
    } else {
      console.error(`Store with Shopify ID ${shopifyStoreId} not found.`);
    } 
  } catch (error) {
    console.error(`Error linking store to user: ${error}`);
    throw error;
  }
};