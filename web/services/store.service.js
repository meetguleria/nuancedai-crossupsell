import Store from "../models/store.model.js";
import shopify from "../shopify.js";

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

export async function fetchShopifyShopDetails(session) {
  const client = new shopify.api.clients.Graphql({ session });
  const response = await client.request(GET_SHOP_DETAILS_QUERY);
  if (response.errors) throw new Error("GraphQL query failed");
  if (!response.data?.shop) throw new Error("Unexpected GraphQL response");
  return response.data.shop;
}

export async function processAndSaveShopDetails(session) {
  const shopDetails = await fetchShopifyShopDetails(session);

  // Start a transaction
  const transaction = await Store.sequelize.transaction();
  
  try {
    const [store, created] = await Store.findOrCreate({
      where: { shopify_domain: shopDetails.myshopifyDomain },
      defaults: {
        shopify_store_id: shopDetails.id,
        myshopify_domain: shopDetails.myshopifyDomain,
        primary_domain_url: shopDetails.primaryDomain.url,
        shopify_store_email: shopDetails.email,
        name: shopDetails.name,
      },
      transaction,
    });
    if (!created) {
      await store.update({
        shopify_store_id: shopDetails.id,
        primary_domain_url: shopDetails.primaryDomain.url,
        shopify_store_email: shopDetails.email,
      }, { transaction });
    }

    // Commit the transaction
    await transaction.commit();
    return store.get({ plain: true });
  } catch (error) {
    // Rollback the transaction
    await transaction.rollback();
    throw error;
  }
}

export async function getOnboardingStatus(storeId) {
  const store = await Store.findByPk(storeId);
  if (!store) throw new Error("Store not found");
  return store.hasCompletedOnboarding;
}

export async function completeOnboarding(storeId) {
  const store = await Store.findByPk(storeId);
  if (!store) throw new Error("Store not found");
  store.hasCompletedOnboarding = true;
  await store.save();
  return store;
}