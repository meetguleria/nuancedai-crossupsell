import shopify from '../shopify.js';

export async function fetchOrderItemsForRecommendations(session) {
    const client = new shopify.api.clients.Graphql(session.shop, session.accessToken);

    const query = `
    {
        orders(first: 10, sortKey: CREATED_AT, reverse: true) {
            edges {
                node {
                    lineItems(first: 5) {
                        edges {
                            node {
                                product {
                                    id
                                    title
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;

    try {
        const response = await client.query({ data: query });

        const orders = response.body.data.orders.edges.map(edge => edge.node);
        const products = orders.flatMap(order => 
            order.lineItems.edges.map(lineItemEdge => lineItemEdge.node.product)
            );
        return products;
    } catch (error) {
        console.error("Error fetching order items for recommendations:", error);
        throw new Error('Failed to fetch order items for recommendations');
    }
}