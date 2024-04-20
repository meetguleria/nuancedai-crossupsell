import './env.js';
import { setupDatabase } from './db.js';
import createTestOrders from '../services/testOrderService.js';

async function run() {
  try {
    await setupDatabase();
    await createTestOrders();
    console.log('Test orders have been created successfully.');
  } catch (error) {
    console.error('Failed to create test orders:', error);
  }
}

run();