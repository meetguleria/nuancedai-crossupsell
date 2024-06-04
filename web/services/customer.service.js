import shopify from "../shopify.js";
import Customer from "../models/customer.model.js";

const GET_CUSTOMER_DETAILS_QUERY = `
query getCustomers($first: Int = 250) {
  customers(first: $first) {
    edges {
      node {
      id
      firstName
      lastName
      email
      ordersCount
      totalSpent
      createdAt
      updatedAt
      }
    }
  }
}`;

export async function fetchCustomers(session) {
  const client = new shopify.api.clients.Graphql({ session });
  let customersData = [];

  try {
    const response = await client.request({
      data: {
        query: GET_CUSTOMER_DETAILS_QUERY,
        variables: { first: 250 }
      }
    });

    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      throw new Error('GraphQL query failed');
    }

    customersData = response.data.customers.edges.map(edge => ({
      shopify_customer_id: edge.node.id,
      first_name: edge.node.firstName,
      last_name: edge.node.lastName,
      email: edge.node.email,
      orders_count: edge.node.totalSpent,
      created_at: edge.node.createdAt,
      updatedAt: edge.node.updatedAt,
    }));
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    throw error;
  }
  return customersData;
}

async function saveOrUpdateCustomers(customersData) {
  try {
    for (const customerData of customersData) {
      const { first_name, last_name, ...customerDetails } = customerData;
      const name = `${first_name} ${last_name}`;
      const [customer, created] = await Customer.findOrCreate({
        where: { shopify_customer_id: customerDetails.shopify_customer_id },
        defaults: { ...customerDetails, name }
      });

      if (!created) {
        await customer.update({ ...customerDetails, name });
      }
    }
    console.log('Customers saved/updated successfully.');
  } catch (error) {
    console.error('Error saving/updating customers:', error);
    throw error;
  }
  return customersData;
}

export async function processCustomers(session) {
  const customersData = await fetchCustomers(session);
  await saveOrUpdateCustomers(customersData);
  console.log('Complete process of fetching and saving customers finished successfully.');
}