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

    }))
        //Check if order already exitsts
        const existingOrder = await Order.findOne({ where: { shopify_order_id: orderData.id } });

        if (existingOrder) {
            await existingOrder.update({
                total_price: orderData.totalPrice,
                customer_id: orderData.customerId,
                shipping_city: orderData.shippingAddress ? orderData.shippingAddress.city : null,
                shipping_country: orderData.shippingAddress ? orderData.shippingAddress.country : null,
                created_at: new Date(orderData.createdAt),
            });
        } else {
            await Order.create({
                shopify_order_id: orderData.id,
                total_price: orderData.totalPrice,
                customer_id: orderData.customerId,
                shipping_city: orderData.shippingAddress ? orderData.shippingAddress.city : null,
                shipping_country: orderData.shippingAddress ? orderData.shippingAddress.country : null,
                created_at: new Date(orderData.createdAt),
            });
        }

        console.log('Order processed successfully.');
    } catch (error) {
        console.error('Failed to save or update order:', error);
        throw error;
    }
}