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

const extractIdFromGid = (gid) => {
  if (!gid) {
    return null;
  }
  const matches = gid.match(/gid:\/\/shopify\/[A-Za-z]+\/(\d+)/);
  return matches ? matches[1] : null;
};

async function fetchOrders(session) {
  console.log('Fetching orders...');
  const client = new shopify.api.clients.Graphql({ session });
  let ordersData = [];

  try {
    console.log('Sending request to Shopify...');
    const response = await client.request(GET_ORDERS_QUERY, { variables: {} });

    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      throw new Error('GraphQL query failed');
    }

    console.log('Processing fetched orders...');
    ordersData = response.data.orders.edges.map(edge => {
      const lineItems = edge.node.lineItems.edges.map(li => {
        console.log('Processing line item:', li.node.title);
        return {
        id: extractIdFromGid(li.node.id),
        title: li.node.title,
        variantId: extractIdFromGid(li.node.variant?.id),
        quantity: li.node.quantity,
        price: li.node.originalTotalSet.shopMoney.amount,
        };
      });

      return {
        shopify_order_id: extractIdFromGid(edge.node.id),
        total_price: edge.node.totalPriceSet.shopMoney.amount,
        order_created_at: edge.node.createdAt,
        displayFinancialStatus: edge.node.displayFinancialStatus,
        displayFulfillmentStatus: edge.node.displayFulfillmentStatus,
        currency_code: edge.node.currencyCode,
        customer_id: extractIdFromGid(edge.node.customer?.id),
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
      const { lineItems, ...orderWithoutLineItems } = orderData;

      const [existingOrder, created] = await Order.findOrCreate({
        where: { shopify_order_id: orderData.shopify_order_id },
        defaults: orderWithoutLineItems,
      });

      if (!created) {
        await existingOrder.update(orderWithoutLineItems);
      }
      await saveOrderItems(existingOrder.id, lineItems);
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