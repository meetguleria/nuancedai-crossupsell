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
  const [store, created] = await Store.findOrCreate({
    where: { shopify_domain: shopDetails.myshopifyDomain },
    defaults: {
      shopify_store_id: shopDetails.id,
      myshopify_domain: shopDetails.myshopifyDomain,
      primary_domain_url: shopDetails.primaryDomain.url,
      shopify_store_email: shopDetails.email,
      name: shopDetails.name,
    },
  });
  if (!created) {
    await store.update({
      shopify_store_id: shopDetails.id,
      primary_domain_url: shopDetails.primaryDomain.url,
      shopify_store_email: shopDetails.email,
    });
  }
  return store.get({ plain: true });
}