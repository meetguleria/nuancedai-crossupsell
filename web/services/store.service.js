import Store from '../models/store.model.js';
import shopify from '../shopify.js';

const GET_SHOP_DETAILS_QUERY = `
query{
  shop {
    id
    name
    email
    myshopifyDomain
    primaryDomain {
      url
    }
    currencyCode
    timezone
  }
}`;

export const fetchShopifyShopDetails = async (session) => {
  const client = shopify.api.clients.Graphql({ session });

  try {
    const response = await client.query({
      data: { query: GET_SHOP_DETAILS_QUERY },
    });

    if (response.body.errors) {
      console.error('GraphQL Errors:', response.body.errors);
      throw new Error('GraphQL query failed');
    }

    return response.body.data.shop;
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