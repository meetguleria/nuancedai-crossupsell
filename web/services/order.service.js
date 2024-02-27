import shopify from '../../../shopify.js';
import Order from './order.model.js';
import { saveOrderItems } from './orderItem.service.js';

const GET_ORDERS_QUERY = `
query getOrders($first: Int = 250) {
    orders(first: $first) {
        edges {
            node {
                id
                name
                totalPrice
                createdAt: orderCreatedAt
                financialStatus
                fulfillmentStatus
                currencyCode
                customer {
                    id
                }
                shippingAddress {
                    city
                    country
                }
            }
        }
    }
}`;

async function fetchOrders(session) {
  const client = shopify.api.clients.Graphql({ session });

  try {
    const response = await client.query({
      data: {
        query: GET_ORDERS_QUERY,
        variables: {},
      },
    });

    if (response.body.errors) {
      console.error('GraphQL Errors:', response.body.errors);
      throw new Error('GraphQL query failed');
    }

    return response.body.data.orders.edges.map(edge => ({
      shopify_order_id: edge.node.id,
      total_price: edge.node.totalPrice,
      order_created_at: edge.node.createdAt,
      financial_status: edge.node.financialStatus,
      fulfillment_status: edge.node.fulfillmentStatus,
      currency_code: edge.node.currencyCode,
      custormer_id: edge.node.customer?.id,
      shipping_city: edge.node.shippingAddress?.city,
      shipping_country: edge.node.shippingAddress?.country,
    }));
} catch (error) {
  console.error('Failed to fetch orders:', error);
  throw error;
  }
}

async function saveOrUpdatedOrders(ordersData) {
  try {
    for (const order of ordersData) {
      const [existing, created] = await Order.findOrCreate({
        where: { shopify_order_id: order.shopify_order_id },
        default: order,
      });

      if (!created) {
        await existing.update(order);
      }
    }
    console.log('Order saved/updated successfully.');
  } catch (error) {
    console.error('Error saving/updating orders:', error);
    throw error;
  }
}

export async function processOrders(session) {
  const ordersData = await fetchOrders(session);
  await saveOrUpdatedOrders(ordersData);
  console.log('Complete process of fetching and saving orders finished successfully.');
}