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
      host
    }
    currencyCode
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


export const createStore = async (storeData) => {
  try {
    const store = await Store.create(storeData);
    return store;
  } catch (error ) {
    console.error('Error creating store:', error);
    throw error;
  }
};

export const updateStore = async (storeId, updates) => {
  try {
    const store = await Store.findByPk(storeId);
    if (!store) {
      console.log('Store not found');
      return null;
    }
    const updatedStore = await store.update(updates);
    console.log('Store updated successfully:', updatedStore);
    return updatedStore;
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
};

// Fetch a store by shopify domain
export const getStoreByShopifyDomain = async (shopifyDomain) => {
  try {
    const store = await Store.findOne({ where: { shopify_domain: shopifyDomain }});
    if (!store) {
      console.log('Store not found for domain:', shopifyDomain);
      return null;
    }
    console.log('Store found:', store);
    return store;
  } catch (error) {
    console.error('Error fetching store by Shopify domain:', error);
    throw error;
  }
};

// Process and save/update shop details after fetching from Shopify
export const processAndSaveShopDetails = async (session, userId) => {
  try {
    const shopDetails = await fetchShopifyShopDetails(session);
    const existingStore = await getStoreByShopifyDomain(shopDetails.myshopifyDomain);

    const storeData = {
      userId: userId,
      shopify_store_id: shopDetails.id,
      shopify_domain: shopDetails.myshopifyDomain,
      primary_domain_url: shopDetails.primaryDomain.url,
    };

    if (existingStore) {
      await updateStore(existingStore.id, storeData);
      console.log('Store updated with new shop details.');
    } else {
      await createStore(storeData);
      console.log('New store created with shop details');
    }
  } catch (error) {
    console.error('Error processing and saving Shopify shop details:', error);
    throw error;
  }
};