import { processProducts } from '../services/product.service.js';
import { processOrders } from '../services/order.service.js';

export async function fetchDataAndProcess(req, res) {
  try {
    const session = res.locals.shopify.session;

    await processOrders(session);
    console.log('Orders processing completed.');

    await processProducts(session);
    console.log('Products processing completed.')

    res.status(200).json({ message: 'Data fetch and processing completed successfully.'});
  } catch (error) {
    console.error('Error during data fetch and processing:', error.message);
    res.status(500).json({ error: 'Internal server error during data fetch and processing'});
  }
};