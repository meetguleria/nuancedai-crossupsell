import shopify from '../shopify.js';

const GET_PRODUCTS_QUERY = `
query getProducts {
  products(first: 3) {
    edges {
      node {
        id
        title
      }
    }
  }
}
`;

export async function fetchProducts(session) {
    
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const response = await client.query({
      data: {
        query: GET_PRODUCTS_QUERY,
        variables: {},
      },
    });

    if (response.body.errors) {
      console.error('GraphQL Errors:', response.body.errors);
      throw new Error('GraphQL query failed');
    }

    return response.body.data.products.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}