import shopify from '../../shopify.js';

const GET_ORDERS_QUERY = `
query getOrders($first: Int = 250) {
  orders(first: $first) {
    edges {
      node {
        id
        totalPrice
        customer {
          id
          defaultAddress {
            city
            country
          }
        }
        shippingAddress {
          city
          country
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              price
              product {
                id
              }
            }
          }
        }
        createdAt
      }
    }
  }
}
`;

export async function fetchOrders(session) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const response = await client.query({
      data: {
        query: GET_ORDERS_QUERY,
        variables: {},
      },
    });

    if (response.body.error) {
      console.error('GraphQL Errors:', response.body.errors);
      throw new Error('GraphQL query failed');
    }

    return response.body.data.orders.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  }
}