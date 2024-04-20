import shopify from '../shopify.js';
import axios from 'axios';
import Product from '../models/product.model.js';
import { randomIntFromInterval } from '../utils/testOrdersUtils.js'

async function createTestOrders(session) {
  const client = new shopify.api.clients.Rest({ session });
  const products = await Product.findAll();
  const selectedProducts = products.slice(0, 10);

  for (const product of selectedProducts) {
    const quantity = randomIntFromInterval(1, 5);
    const price = parseFloat(product.price);
    const grams = randomIntFromInterval(200, 1500);
    const taxRate = 0.06;
    const taxPrice = parseFloat((price * quantity * taxRate).toFixed(2));

    const orderData = {
      order: {
        email: `test+${Math.random().toString(36).substring(7)}@example.com`,
        financial_status: "pending",
        total_tax: taxPrice,
        currency: "USD",
        line_items: [{
          title: product.title,
          price: price,
          grams: grams,
          quantity: quantity,
          tax_lines: [{
            price: taxPrice,
            rate: taxRate,
            title: "State Tax"
          }]
        }],
        test: true,
        transactions: [{
          test: true,
          kind: "authorization",
          status: "success",
          amount: price * quantity + taxPrice
        }]
      }
    };

    try {
      const response = await client.post({
        path: 'orders',
        data: orderData
      });
      console.log(`Test order created successfully: Order ID ${response.body.order.id}`);
    } catch (error) {
      console.error('Failed to create test order:', error.response ? error.response.data : error.message);
    }
  }
}

export default createTestOrders;