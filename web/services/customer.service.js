import shopify from "../shopify.js";
import ShopCustomer from "../models/customer.model.js";

const GET_CUSTOMER_DETAILS_QUERY = `
query {
  customers(first:10) {
    edges {
      node {
      id
      email
      firstName
      lastName
      ordersCount
      totalSpent
      createdAt
      updatedAt
      }
    }
  }
}`;

export const fetchShopifyCustomerDetails = async (session) => {
  try {
    const client = new shopify.api.clients.Graphql({ session });
    const response = await client.request(GET_CUSTOMER_DETAILS_QUERY);

    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      throw new Error('GraphQL query failed');
    }

    if (response.data && response.data.customers) {
      return response.data.customers.edges.map(edge => edge.node);
    } else {
      console.error('Unexpected GraphQL response structures:', JSON.stringify(response));
      throw error;
    }
  };

  export const processAndSaveCustomerDetails = async (session) => {
    console.log('Fetched customer details:', customerDetails);

    try {
      for (const customer of customerDetails) {
        await ShopCustomer.findOrCreate({
          where: { id: customer.id },
          defaults: {
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            ordersCount: customer.totalSpent,
            totalSpent: customer.totalSpent,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
          }
        });
      }
    }
    console.log('Customer details saved successfully.');
  } catch (error) {
    console.error('Error during database operations:', error);
  }
}