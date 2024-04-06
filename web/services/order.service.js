import shopify from '../shopify.js';
import Order from '../models/order.model.js';
import { saveOrderItems } from './orderItem.service.js';

const GET_ORDERS_QUERY = `
query getOrders($first: Int = 250) {
  orders(first: $first) {
    edges {
      node {
        id
          lineItems(first: 250) {
            edges {
              node {
                id
                title
                variant {
                  id
                }
                quantity
                originalTotalSet {
                  shopMoney {
                    amount
                  }
                }
              }
            }
          }
        name
        totalPriceSet {
          shopMoney {
            amount
          }
        }
        createdAt
        displayFinancialStatus
        displayFulfillmentStatus
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
  const client = new shopify.api.clients.Graphql({ session });
  let ordersData = [];

  try {
    const response = await client.request({
      data: {
        query: GET_ORDERS_QUERY,
        variables: {},
      },
    });

    if (response.body.errors) {
      console.error('GraphQL Errors:', response.body.errors);
      throw new Error('GraphQL query failed');
    }

    ordersData = response.body.data.orders.edges.map(edge => {
      const lineItems = edge.node.lineItems.edges.map(li => ({
        id: li.node.id,
        title: li.node.title,
        variantId: li.node.variantId,
        quantity: li.node.quantity,
        price: li.node.price,
      }));

      return {
        shopify_order_id: edge.node.id,
        total_price: edge.node.totalPriceSet.shopMoney.amount,
        order_created_at: edge.node.createdAt,
        financial_status: edge.node.displayFinancialStatus,
        fulfillment_status: edge.node.displayFinancialStatus,
        currency_code: edge.node.currencyCode,
        customer_id: edge.node.customer?.id,
        shipping_city: edge.node.shippingAddress?.city,
        shipping_country: edge.node.shippingAddress?.country,
        lineItems: lineItems,
      };
    })
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error;
  }
  return ordersData;
}

async function saveOrUpdatedOrders(ordersData) {
  try {
    for (const orderData of ordersData) {
      const [existingOrder, created] = await Order.findOrCreate({
        where: { shopify_order_id: orderData.shopify_order_id },
        defaults: orderData,
      });

      if (!created) {
        await existingOrder.update(orderData);
      }
      await saveOrderItems(existingOrder.id, orderData.lineItems);
    }
    console.log('Orders and order items saved/updated successfully.');
  } catch (error) {
    console.error('Error saving/updating orders and order items:', error);
    throw error;
  }
}

export async function processOrders(session) {
  const ordersData = await fetchOrders(session);
  await saveOrUpdatedOrders(ordersData);
  console.log('Complete process of fetching and saving orders finished successfully.');
}