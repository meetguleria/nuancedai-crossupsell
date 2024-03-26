import Store from '../models/store.model.js';
import shopify from '../shopify.js';

const GET_SHOP_DETAILS_QUERY = `
query {
  shop {
    id
    email
    name
    myshopifyDomain
    primaryDomain {
      url
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
    }

    if (response.data && response.data.shop) {
      return response.data.shop;
    } else {
      console.error('Unexpected GraphQL response structure:', JSON.stringify(response));
      throw new Error('Unexpected GraphQL response structure, data missing');
    }
  } catch (error) {
    console.error('Error fetching shop details:', error.message);
    throw error;
  }
};

export const processAndSaveShopDetails = async (session) => {
  console.log('Starting processAndSaveShopDetails...');

  const shopDetails = await fetchShopifyShopDetails(session);

  console.log('Fetched shop details:', shopDetails);

  try {
    console.log('Attempting to save shop details to db:', shopDetails);
    const [store, created] = await Store.findOrCreate({
      where: { shopify_domain: shopDetails.myshopifyDomain },
      defaults: {
        shopify_store_id: shopDetails.id,
        myshopify_domain: shopDetails.myshopifyDomain,
        primary_domain_url: shopDetails.primaryDomain.url,
        shopify_store_email: shopDetails.email,
        name: shopDetails.name,
      }
    });
    console.log(created ? 'New store created.' : 'Found existing store, updating.', store.toJSON());

    if (!created) {
      await store.update({
        shopify_store_id: shopDetails.id,
        primary_domain_url: shopDetails.primaryDomain.url,
        shopify_store_email: shopDetails.email,
      })
      console.log('Store update successful:', store.toJSON());
    }
    return store.get({ plain: true });
  } catch (error) {
    console.error('Error during database operation:', error);
    throw error;
  }
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