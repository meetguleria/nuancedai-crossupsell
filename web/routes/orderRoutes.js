import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/fetch-and-process', orderController.fetchAndProcessOrders);

export default router;