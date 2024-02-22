import shopify from '../shopify.js';

export async function fetchSimpleOrderData(session) {
    const client = new shopify.api.clients.Graphql({ session });

    const query = `
    {
        orders(first: 10, sortKey: CREATED_AT, reverse: true) {
            edges {
                node {
                    id
                    createdAt
                    currency
                    totalPriceSet {
                        presentmentMoney {
                            amount
                        }
                    }
                }
            }
        }
    }`;

    try {
        const response = await client.query({ data: query });
        const ordersData = response.body.data.orders.edge.map(edge => ({
            createdAt: edge.node.createdAt,
            currency: edge.node.currency,
            currentTotalPrice: parseFloat(edge.node.totalPriceSet.presentmentMoney.amount),
        }));
        return ordersData;
    } catch (error) {
        console.error("Error fetching simplified order data:", error);
        throw new Error('Failed to fetch simplified order data');
    }
}
// export async function fetchOrderItemsForRecommendations(session) {
//     const client = new shopify.api.clients.Graphql({ session });

//     const query = `
//     {
//         orders(first: 10, sortKey: CREATED_AT, reverse: true) {
//             edges {
//                 node {
//                     lineItems(first: 5) {
//                         edges {
//                             node {
//                                 product {
//                                     id
//                                     title
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }`;

//     try {
//         const response = await client.query({ data: query });

//         const orders = response.body.data.orders.edges.map(edge => edge.node);
//         const products = orders.flatMap(order => 
//             order.lineItems.edges.map(lineItemEdge => lineItemEdge.node.product)
//             );
//         return products;
//     } catch (error) {
//         console.error("Error fetching order items for recommendations:", error);
//         throw new Error('Failed to fetch order items for recommendations');
//     }
// }