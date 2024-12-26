import shopify from "../shopify.js";
import User from "../models/user.model.js";

const GET_USER_DETAILS_QUERY = `
query {
  shop {
    name
    email
    myshopifyDomain
    primaryDomain {
      url
    }
  }
}`;

export async function fetchShopUserDetails(session) {
  const client = new shopify.api.clients.Graphql({ session });
  const response = await client.request({ data: { query: GET_USER_DETAILS_QUERY } });
  if (response.errors) throw new Error("GraphQL query failed");
  if (!response.data?.shop) throw new Error("Unexpected GraphQL response");
  return {
    shopName: response.data.shop.name,
    email: response.data.shop.email,
    myshopifyDomain: response.data.shop.myshopifyDomain,
    primaryDomainUrl: response.data.shop.primaryDomain?.url,
  };
}

export async function processAndSaveUserDetails(session) {
  const userDetails = await fetchShopUserDetails(session);
  const [user, created] = await User.findOrCreate({
    where: { myshopify_domain: userDetails.myshopifyDomain },
    defaults: {
      shop_name: userDetails.shopName,
      email: userDetails.email,
      myshopify_domain: userDetails.myshopifyDomain,
      primary_domain_url: userDetails.primaryDomainUrl,
    },
  });
  if (!created) {
    await user.update({
      shop_name: userDetails.shopName,
      primary_domain_url: userDetails.primaryDomainUrl,
      myshopifyDomain: userDetails.myshopifyDomain,
    });
  }
  return user.get({ plain: true });
}