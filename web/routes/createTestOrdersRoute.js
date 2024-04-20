import express from 'express';
import { handleCreateTestOrders } from '../controllers/testOrdersController.js';

const router = express.Router();

router.get('/create-test-orders', handleCreateTestOrders);

export default router;
