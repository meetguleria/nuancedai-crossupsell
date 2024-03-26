import shopify from "../shopify.js";

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
  try {
    const client = new shopify.api.clients.Graphql({ session });
    const response = await client.request(GET_SHOP_DETAILS_QUERY, {
      variables: {},
    });

    if (response.errors) {
      console.error("GraphQL Errors:", response.errors);
      throw new Error("GraphQL query failed");
    }

    if (response.data && response.data.shop) {
      return response.data.shop;
    } else {
      console.error(
        "Unexpected GraphQL response structure:",
        JSON.stringify(response)
      );
      throw new Error("Unexpected GraphQL response structure, data missing");
    }
  } catch (error) {
    console.error("Error fetching shop details:", error.message);
    throw error;
  }
};
