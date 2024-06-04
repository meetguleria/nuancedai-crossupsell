import shopify from "../shopify.js";
import User from '../models/user.model.js';
import Store from '../models/store.model.js';

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

export const fetchShopUserDetails = async (session) => {
  try {
    const client = new shopify.api.clients.Graphql({ session });
    const response = await client.request({
      data: {
        query: GET_USER_DETAILS_QUERY,
        variables: {},
      }
    });

    if (response.errors) {
      console.error("GraphQL Errors:", response.errors);
      throw new Error("GraphQL query failed");
    }

    if (response.data && response.data.shop) {
      return {
        shopName: response.data.shop.name,
        email: response.data.shop.email,
        myshopifyDomain: response.data.shop.myshopifyDomain,
        primaryDomainUrl: response.data.shop.primaryDomainUrl
      };
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

export const processAndSaveUserDetails = async (session) => {
  console.log('Starting processAndSaveUserDetails...');

  const userDetails = await fetchShopUserDetails(session);

  console.log('Fetched user details:', userDetails);

  try {
    console.log('Attempting to save shop details to db:', userDetails);
    const [user, created] = await User.findOrCreate({
      where: { myshopify_domain: userDetails.myshopifyDomain},
      defaults: {
        shop_name: userDetails.shopName,
        email: userDetails.email,
        myshopify_domain: userDetails.myshopifyDomain,
        primary_domain_url: userDetails.primaryDomainUrl,
      }
    });
    console.log(created ? 'New user created.': 'Found existing user, updating.', user.toJSON());

    if (!created) {
      await user.update({
        shop_name: userDetails.shopName,
        primary_domain_url: userDetails.primaryDomainUrl,
        myshopifyDomain: userDetails.myshopifyDomain,
      });
      console.log('User update successful:', user.toJSON());
    }

    return user.get({ plain: true });
  } catch (error) {
    console.error('Error during database operation:', error);
    throw error;
  }
};
