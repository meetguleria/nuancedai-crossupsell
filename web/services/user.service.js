import shopify from '../shopify.js';

const GET_SHOP_DETAILS_QUERY = `
query {
  shop {
    name
    myshopifyDomain
    primaryDomain {
      url
    }
    currencyCode
    shipsToCountries
    contactEmail
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