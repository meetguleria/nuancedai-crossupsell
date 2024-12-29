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
    rawShopifyData: response.data.shop, 
  };
}

export async function processAndSaveUserDetails(session) {
  const userDetails = await fetchShopUserDetails(session);

  // Start a transaction
  const transaction = await User.sequelize.transaction();

  try {
    const [user, created] = await User.findOrCreate({
      where: { myshopify_domain: userDetails.myshopifyDomain },
      defaults: {
        email: userDetails.email,
        myshopify_domain: userDetails.myshopifyDomain,
        shop_name: userDetails.shopName,
        primary_domain_url: userDetails.primaryDomainUrl,
        shopify_data: userDetails.rawShopifyData,
      },
      transaction,
    });
    if (!created) {
      await user.update({
        email: userDetails.email,
        shop_name: userDetails.shopName,
        primary_domain_url: userDetails.primaryDomainUrl,
        shopify_data: userDetails.rawShopifyData,
      }, { transaction });
    }

    // Commit the transaction
    await transaction.commit();
    return user.get({ plain: true });
  } catch (error) {
    // Rollback the transaction
    await transaction.rollback();
    throw error;
  }
}

export async function getUserDetails(session) {
  const user = await User.findOne({ where: { myshopify_domain: session.shop } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function updateUserSettings(session, newSettings) {
  const user = await User.findOne({ where: { myshopify_domain: session.shop } });
  if (!user) {
    throw new Error('User not found');
  }
  await user.update({ app_settings: newSettings });
  return user;
}

export async function updateDataConsent(session, consent) {
  const user = await User.findOne({ where: { myshopify_domain: session.shop } });
  if (!user) {
    throw new Error('User not found');
  }
  await user.update({ data_consent: consent });
  return user;
}