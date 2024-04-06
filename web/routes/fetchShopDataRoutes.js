import express from 'express';
import { fetchDataAndProcess } from '../controllers/shopDataController.js';

const router = express.Router();
console.log('Setting up /fetch-and-process-shop-data route');

router.get('/fetch-and-process-shop-data', fetchDataAndProcess);

export default router;